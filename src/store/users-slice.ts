import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type BrandUser = {
  id: string;
  id2?: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  createdAt: string;
  brandName: string;
  brandCode: string;
  arabicName: string;
  englishName: string;
  username: string;
  [key: string]: unknown;
};

export type UsersState = BrandUser[];

const initialState: UsersState = [
  {
    id: '1',
    name: 'أورا للتسويق',
    email: 'Aura@gmail.com',
    status: 'active',
    role: 'user',
    createdAt: '10-03-2026',
    brandName: 'أورا للتسويق الالكتروني',
    brandCode: '455454',
    arabicName: 'العتيبي عبدالله',
    englishName: 'أوليا يونس',
    username: 'MI',
    id2: '544554',
  },
  {
    id: '2',
    name: 'أورا للتسويق',
    email: 'Aura@gmail.com',
    status: 'inactive',
    role: 'user',
    createdAt: '10-03-2026',
    brandName: 'أورا للتسويق الالكتروني',
    brandCode: '455454',
    arabicName: 'العتيبي عبدالله',
    englishName: 'أوليا يونس',
    username: 'MI',
    id2: '544554',
  },
  {
    id: '3',
    name: 'أورا للتسويق',
    email: 'Aura@gmail.com',
    status: 'active',
    role: 'admin',
    createdAt: '10-03-2026',
    brandName: 'أورا للتسويق الالكتروني',
    brandCode: '455454',
    arabicName: 'العتيبي عبدالله',
    englishName: 'أوليا يونس',
    username: 'MI',
    id2: '544554',
  },
  {
    id: '4',
    name: 'شركة التقنية المتطورة',
    email: 'tech@gmail.com',
    status: 'active',
    role: 'user',
    createdAt: '09-03-2026',
    brandName: 'التقنية المتطورة للحلول الذكية',
    brandCode: '455455',
    arabicName: 'الأحمد محمد',
    englishName: 'محمد أحمد',
    username: 'MA',
    id2: '544555',
  },
  {
    id: '5',
    name: 'مؤسسة الابتكار',
    email: 'innovation@gmail.com',
    status: 'active',
    role: 'user',
    createdAt: '08-03-2026',
    brandName: 'مؤسسة الابتكار التقني',
    brandCode: '455456',
    arabicName: 'السعيد فايز',
    englishName: 'فايز السعيد',
    username: 'FS',
    id2: '544556',
  },
  {
    id: '6',
    name: 'شركة الرؤية المستقبلية',
    email: 'vision@gmail.com',
    status: 'inactive',
    role: 'user',
    createdAt: '07-03-2026',
    brandName: 'الرؤية المستقبلية للاستثمار',
    brandCode: '455457',
    arabicName: 'الخالد سارة',
    englishName: 'سارة الخالد',
    username: 'SK',
    id2: '544557',
  },
  {
    id: '7',
    name: 'مجموعة النجاح',
    email: 'success@gmail.com',
    status: 'active',
    role: 'admin',
    createdAt: '06-03-2026',
    brandName: 'مجموعة النجاح التجارية',
    brandCode: '455458',
    arabicName: 'الزهراني أحمد',
    englishName: 'أحمد الزهراني',
    username: 'AZ',
    id2: '544558',
  },
  {
    id: '8',
    name: 'شركة الإبداع',
    email: 'creative@gmail.com',
    status: 'inactive',
    role: 'user',
    createdAt: '05-03-2026',
    brandName: 'شركة الإبداع والتطوير',
    brandCode: '455459',
    arabicName: 'القحطاني نورا',
    englishName: 'نورا القحطاني',
    username: 'NQ',
    id2: '544559',
  },
  {
    id: '9',
    name: 'مؤسسة التميز',
    email: 'excellence@gmail.com',
    status: 'active',
    role: 'user',
    createdAt: '04-03-2026',
    brandName: 'مؤسسة التميز للخدمات',
    brandCode: '455460',
    arabicName: 'الحربي يوسف',
    englishName: 'يوسف الحربي',
    username: 'YH',
    id2: '544560',
  },
  {
    id: '10',
    name: 'شركة الأمل',
    email: 'hope@gmail.com',
    status: 'inactive',
    role: 'user',
    createdAt: '03-03-2026',
    brandName: 'شركة الأمل للاستثمار',
    brandCode: '455461',
    arabicName: 'العنزي لينا',
    englishName: 'لينا العنزي',
    username: 'LA',
    id2: '544561',
  },
  {
    id: '11',
    name: 'مجموعة الفجر',
    email: 'dawn@gmail.com',
    status: 'active',
    role: 'user',
    createdAt: '02-03-2026',
    brandName: 'مجموعة الفجر التجارية',
    brandCode: '455462',
    arabicName: 'الشمري خالد',
    englishName: 'خالد الشمري',
    username: 'KS',
    id2: '544562',
  },
  {
    id: '12',
    name: 'شركة النور',
    email: 'light@gmail.com',
    status: 'pending',
    role: 'user',
    createdAt: '01-03-2026',
    brandName: 'شركة النور للتقنية',
    brandCode: '455463',
    arabicName: 'الدوسري مريم',
    englishName: 'مريم الدوسري',
    username: 'MD',
    id2: '544563',
  },
];

const usersSlice = createSlice<UsersState>({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state: UsersState, action: PayloadAction<BrandUser>) => {
      state.push(action.payload);
    },
    updateUser: (state: UsersState, action: PayloadAction<BrandUser>) => {
      const idx = state.findIndex((u: BrandUser) => u.id === action.payload.id);
      if (idx !== -1) state[idx] = action.payload;
    },
    deleteUser: (state: UsersState, action: PayloadAction<string>) => {
      return state.filter((u: BrandUser) => u.id !== action.payload);
    },
    deleteUsers: (state: UsersState, action: PayloadAction<string[]>) => {
      return state.filter((u: BrandUser) => !action.payload.includes(u.id));
    },
  },
});

export const { addUser, updateUser, deleteUser, deleteUsers } = usersSlice.actions;
export default usersSlice.reducer;
