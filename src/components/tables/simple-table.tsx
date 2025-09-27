'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  RowSelectionState,
  PaginationState,
  OnChangeFn,
  Updater,
} from '@tanstack/react-table';
import { ArrowLeft, ArrowRight } from 'iconsax-reactjs';
import { Search } from 'lucide-react';
import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { srcs } from '@/config/scrs';

// Types
export interface SimpleColumn<TData> {
  key: keyof TData;
  header: string | React.ReactNode;
  render?: (
    value: TData[keyof TData],
    row: TData,
    index: number,
  ) => React.ReactNode;
  className?: string;
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  size?: number;
}

export interface TableStyles {
  container?: string;
  searchContainer?: string;
  searchInput?: string;
  table?: string;
  mainTable?: string;
  header?: string;
  headerRow?: string;
  headerCell?: string;
  body?: string;
  row?: string;
  selectedRow?: string;
  cell?: string;
  pagination?: string;
  paginationInfo?: string;
  selectionInfo?: string;
  pageSize?: string;
  loadingCell?: string;
  emptyCell?: string;
}

export interface SimpleTableProps<TData> {
  data: TData[];
  columns: SimpleColumn<TData>[];
  // Search Control
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  // Pagination Control
  paginated?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageSize?: number;
  pageSizeOptions?: number[];
  // Selection Control
  selectable?: boolean;
  bulkSelect?: boolean;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSelectionChange?: (selectedRows: TData[]) => void;
  // Styling Control
  styles?: TableStyles;
  stickyHeader?: boolean;
  // States
  loading?: boolean;
  emptyMessage?: string;
  children?: React.ReactNode;
  customHeader?: boolean;
  className?: string;
  // Layout control
  tableLayout?: 'fixed' | 'auto';
}

// Constants
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZE_OPTIONS = [2, 10, 25, 50, 100];
const SELECTION_COLUMN_SIZE = 60;
const DEFAULT_COLUMN_SIZE = 150;

function SimpleTable<TData extends object>({
  data,
  columns,
  // Search
  searchable = true,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  // Pagination
  paginated = true,
  pagination: externalPagination,
  onPaginationChange: onExternalPaginationChange,
  pageSize = DEFAULT_PAGE_SIZE,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  // Selection
  selectable = false,
  bulkSelect = false,
  rowSelection: externalRowSelection,
  onRowSelectionChange: onExternalRowSelectionChange,
  onSelectionChange,
  // Styling
  styles = {},
  stickyHeader = false,
  // States
  loading = false,
  emptyMessage = 'No data available',
  // Header
  customHeader,
  children,
  className = '',
  tableLayout = 'fixed',
}: SimpleTableProps<TData>) {
  // Internal states
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>({});
  const [internalGlobalFilter, setInternalGlobalFilter] = useState('');
  const [internalPagination, setInternalPagination] = useState<PaginationState>(
    {
      pageIndex: 0,
      pageSize,
    },
  );

  // Determine if we're using controlled or uncontrolled state
  const isControlledSelection =
    externalRowSelection !== undefined &&
    onExternalRowSelectionChange !== undefined;
  const isControlledSearch =
    searchValue !== undefined && onSearchChange !== undefined;
  const isControlledPagination =
    externalPagination !== undefined &&
    onExternalPaginationChange !== undefined;

  // Get current values
  const currentRowSelection = isControlledSelection
    ? externalRowSelection
    : internalRowSelection;
  const currentGlobalFilter = isControlledSearch
    ? searchValue
    : internalGlobalFilter;
  const currentPagination = isControlledPagination
    ? externalPagination
    : internalPagination;

  // Create TanStack table columns with proper sizing
  const tableColumns = useMemo((): ColumnDef<TData>[] => {
    const cols: ColumnDef<TData>[] = [];

    // Add selection column if enabled
    if (selectable) {
      cols.push({
        id: 'select',
        header: ({ table }) =>
          bulkSelect ? (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={value =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
              className="data-[state=checked]:bg-[var(--main-300)] data-[state=checked]:border-[var(--main-300)] data-[state=checked]:text-white border-2 border-gray-300"
            />
          ) : null,
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="data-[state=checked]:bg-[var(--main-300)] data-[state=checked]:border-[var(--main-300)] data-[state=checked]:text-white border-2 border-gray-300"
          />
        ),
        size: SELECTION_COLUMN_SIZE,
      });
    }

    // Add configured columns with proper sizing
    columns.forEach(column => {
      cols.push({
        accessorKey: column.key as string,
        header: () => <div className="text-center">{column.header}</div>,
        cell: ({ row }) => {
          const value = row.getValue(
            column.key as string,
          ) as TData[keyof TData];
          return column.render ? (
            column.render(value, row.original, row.index)
          ) : (
            <div className="text-center">{String(value ?? '')}</div>
          );
        },
        size: column.size || DEFAULT_COLUMN_SIZE,
        minSize: column.size || DEFAULT_COLUMN_SIZE,
        maxSize: column.size || DEFAULT_COLUMN_SIZE,
      });
    });

    return cols;
  }, [columns, selectable, bulkSelect]);

  // Handle search change
  const handleSearchChange = useCallback(
    (value: string) => {
      if (isControlledSearch) {
        onSearchChange?.(value);
      } else {
        setInternalGlobalFilter(value);
      }
    },
    [isControlledSearch, onSearchChange],
  );

  // Handle pagination change
  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      if (isControlledPagination) {
        onExternalPaginationChange?.(updater);
      } else {
        setInternalPagination(updater);
      }
    },
    [isControlledPagination, onExternalPaginationChange],
  );

  // Handle row selection change
  const handleRowSelectionChange = useCallback(
    (updater: Updater<RowSelectionState>) => {
      if (isControlledSelection) {
        onExternalRowSelectionChange?.(updater);
      } else {
        setInternalRowSelection(updater);
      }
    },
    [isControlledSelection, onExternalRowSelectionChange],
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: paginated ? getPaginationRowModel() : undefined,
    getFilteredRowModel: searchable ? getFilteredRowModel() : undefined,
    onRowSelectionChange: handleRowSelectionChange,
    onGlobalFilterChange: handleSearchChange,
    onPaginationChange: handlePaginationChange,
    globalFilterFn: 'includesString',
    manualPagination: false,
    state: {
      rowSelection: selectable ? currentRowSelection : {},
      globalFilter: searchable ? currentGlobalFilter : undefined,
      pagination: paginated ? currentPagination : undefined,
    },
  });

  // Handle selection changes
  useEffect(() => {
    if (onSelectionChange && selectable) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map(row => row.original);
      onSelectionChange(selectedRows);
    }
  }, [currentRowSelection, onSelectionChange, selectable, table]);

  // Handle page input change
  const handlePageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const page = Number(e.target.value) - 1;
      if (!isNaN(page) && page >= 0 && page < table.getPageCount()) {
        if (isControlledPagination) {
          onExternalPaginationChange?.({
            ...currentPagination,
            pageIndex: page,
          });
        } else {
          table.setPageIndex(page);
        }
      }
    },
    [
      isControlledPagination,
      onExternalPaginationChange,
      currentPagination,
      table,
    ],
  );

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newPageSize = Number(value);
      if (isControlledPagination) {
        onExternalPaginationChange?.({
          ...currentPagination,
          pageSize: newPageSize,
          pageIndex: 0,
        });
      } else {
        setInternalPagination(prev => ({
          ...prev,
          pageSize: newPageSize,
          pageIndex: 0,
        }));
      }
    },
    [isControlledPagination, onExternalPaginationChange, currentPagination],
  );

  // Handle previous page navigation
  const handlePreviousPage = useCallback(() => {
    if (isControlledPagination) {
      onExternalPaginationChange?.({
        ...currentPagination,
        pageIndex: Math.max(0, currentPagination.pageIndex - 1),
      });
    } else {
      table.previousPage();
    }
  }, [
    isControlledPagination,
    onExternalPaginationChange,
    currentPagination,
    table,
  ]);

  // Handle next page navigation
  const handleNextPage = useCallback(() => {
    if (isControlledPagination) {
      onExternalPaginationChange?.({
        ...currentPagination,
        pageIndex: Math.min(
          table.getPageCount() - 1,
          currentPagination.pageIndex + 1,
        ),
      });
    } else {
      table.nextPage();
    }
  }, [
    isControlledPagination,
    onExternalPaginationChange,
    currentPagination,
    table,
  ]);

  return (
    <>
      <div
        className={cn(
          'space-y-4 w-full overflow-auto',
          styles.container,
          className,
        )}
      >
        {/* Search and Page Size */}
        {!customHeader && searchable && (
          <div
            className={cn(
              'flex items-center justify-between mb-0',
              styles.searchContainer,
            )}
          >
            <div className={cn('relative max-w-sm', styles.searchContainer)}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={currentGlobalFilter}
                onChange={e => handleSearchChange(e.target.value)}
                className={cn('pl-10', styles.searchInput)}
              />
            </div>
          </div>
        )}

        {/* Custom Header */}
        {customHeader && children}

        {/* Table */}
        <div className={cn('rounded-md w-full overflow-x-auto', styles.table)}>
          <Table
            className={cn('', styles.mainTable)}
            style={{
              tableLayout:
                (tableLayout ?? 'fixed') === 'fixed' ? 'fixed' : 'auto',
              width: '100%',
            }}
          >
            <TableHeader
              className={cn(
                stickyHeader &&
                  'sticky top-0 z-10 bg-background hover:bg-transparent',
                styles.header,
              )}
            >
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} className={cn(styles.headerRow)}>
                  {headerGroup.headers.map(header => (
                    <TableHead
                      key={header.id}
                      className={cn(styles.headerCell)}
                      style={
                        (tableLayout ?? 'fixed') === 'fixed'
                          ? {
                              width: header.getSize(),
                              minWidth: header.getSize(),
                              maxWidth: header.getSize(),
                            }
                          : undefined
                      }
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className={cn(styles.body)}>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className={cn('h-24 text-center', styles.loadingCell)}
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : columns.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      styles.row,
                      row.getIsSelected() && styles.selectedRow,
                    )}
                  >
                    {row.getVisibleCells().map(cell => (
                      <TableCell
                        key={cell.id}
                        className={cn(styles.cell)}
                        style={
                          (tableLayout ?? 'fixed') === 'fixed'
                            ? {
                                width: cell.column.getSize(),
                                minWidth: cell.column.getSize(),
                                maxWidth: cell.column.getSize(),
                              }
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableColumns.length}
                    className={cn(
                      ' text-center flex flex-col items-center justify-center',
                      styles.emptyCell,
                    )}
                  >
                    <Image
                      src={srcs.emptyTable}
                      alt="empty table"
                      width={300}
                      height={300}
                    />
                    <div className="text-main-mute text-lg">{emptyMessage}</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {paginated && (
        <div
          className={cn(
            'flex items-center justify-between mt-4 max-lg:flex-col gap-4',
            styles.pagination,
          )}
        >
          <div dir="rtl" className="flex items-center gap-4 ">
            <Pagination>
              <PaginationContent>
                {/* Previous Arrow */}
                <PaginationItem>
                  <button
                    onClick={handlePreviousPage}
                    disabled={!table.getCanPreviousPage()}
                    className="p-2 rounded-full bg-[var(--main-300)] disabled:bg-[var(--main-container)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowRight className="w-6 h-6 text-white" />
                  </button>
                </PaginationItem>

                {/* Next Arrow */}
                <PaginationItem>
                  <button
                    onClick={handleNextPage}
                    disabled={!table.getCanNextPage()}
                    className="p-2 rounded-full bg-[var(--main-300)] disabled:bg-[var(--main-container)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6 text-white" />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div
              className={cn(
                'flex items-center space-x-2 max-lg:hidden',
                styles.pageSize,
              )}
            >
              <Select
                dir="rtl"
                value={currentPagination.pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-16 !h-10 border-white rounded-4xl bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-main-container2 border-1 border-[#ffffff1a] text-white">
                  {pageSizeOptions.map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-main-mute text-nowrap font-light">
                صفوف / صفحة
              </span>
            </div>
          </div>
          <div className="flex justify-between max-lg:w-full gap-3">
            <div
              className={cn(
                'flex items-center space-x-2 lg:hidden',
                styles.pageSize,
              )}
            >
              <Select
                dir="rtl"
                value={currentPagination.pageSize.toString()}
                onValueChange={handlePageSizeChange}
              >
                <SelectTrigger className="w-16 !h-10 border-white rounded-4xl bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-main-container2 border-1 border-[#ffffff1a] text-white">
                  {pageSizeOptions.map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm text-main-mute text-nowrap font-light">
                صفوف / صفحة
              </span>
            </div>
            <div className="flex items-center gap-2 text-main-mute text-nowrap font-light">
              <span className="text-sm">صفحة</span>
              <Input
                type="number"
                min={1}
                max={table.getPageCount()}
                value={currentPagination.pageIndex + 1}
                onChange={handlePageInputChange}
                className="w-14 !h-10 border-main-mute rounded-4xl text-center border bg-transparent"
              />
              <span className="text-sm">من {table.getPageCount()}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SimpleTable;
