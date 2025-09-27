import { AlertCircleIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { DocumentUpload } from 'iconsax-reactjs';

import { useFileUpload, type FileWithPreview } from '@/hooks/use-file-upload';

type UploadComponentProps = {
  accept?: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFilesChange?: (files: FileWithPreview[]) => void;
};

export default function UploadComponent({
  accept = '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
  maxSizeMB = 5,
  multiple = false,
  onFilesChange,
}: UploadComponentProps) {
  const maxSize = maxSizeMB * 1024 * 1024; // default 5MB

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize,
    multiple,
    onFilesChange,
  });

  const firstFile = files[0];
  const previewUrl: string | undefined = firstFile?.preview || undefined;
  const isImage =
    firstFile?.file instanceof File &&
    !!previewUrl &&
    firstFile.file.type.startsWith('image/');

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input cursor-pointer  data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-42 flex-col items-center justify-center overflow-hidden rounded-xl   border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] w-[80%] m-auto mt-5"
        >
          <svg
            className="absolute inset-0 w-[99%] m-auto h-full rounded-xl pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="calc(100% - 1px)"
              height="calc(100% - 1px)"
              rx="12"
              ry="12"
              fill="none"
              stroke="#FFFFFF3D"
              strokeWidth="1"
              strokeDasharray="9,7" // ← نفس اللي في Figma
            />
          </svg>
          <input
            {...getInputProps({ accept, multiple })}
            className="sr-only"
            aria-label="Upload file"
          />
          {isImage ? (
            <div className="absolute inset-0">
              <Image
                src={previewUrl as string}
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="size-full object-contain p-2"
                width={200}
                height={200}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-main-300 w-12 h-12 mb-2 p-2 flex size-11 shrink-0 items-center justify-center rounded-full  "
                aria-hidden="true"
              >
                <DocumentUpload size="32" color="#fff" variant="Outline" />{' '}
              </div>
              <p className="mb-1.5 text-sm font-medium">
                اضغط لرفع الملف قم بسحب الملف
              </p>
              <p className="text-muted-foreground text-xs">
                الملفات المدعومة: CSV, XLSX
                {/* Max size: {maxSizeMB}MB */}
              </p>
              {files.length > 0 && (
                <div className="mt-3 text-xs text-white/80">
                  {files.map(f => (
                    <div key={f.id}>{(f.file as File).name || 'ملف'}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => {
                if (files[0]?.id) {
                  removeFile(files[0].id);
                }
              }}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-sm text-center justify-center mt-1"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* <p
        aria-live="polite"
        role="region"
        className="text-muted-foreground mt-2 text-center text-xs"
      >
        Single image uploader w/ max size ∙{" "}
        <a
          href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
          className="hover:text-foreground underline"
        >
          API
        </a>
      </p> */}
    </div>
  );
}

