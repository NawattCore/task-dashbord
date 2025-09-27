import {
  Buildings2,
  Category2,
  Home2,
  MedalStar,
  People,
  SmsStar,
  StatusUp,
  TagUser,
  UserSquare,
} from 'iconsax-reactjs';

export const routes = {
  home: {
    path: '/',
    name: 'الرئيسية',
    icon: Home2,
    inSideBar: true,
  },
  brand: {
    path: '/brand',
    name: 'العلامات التجارية',
    icon: MedalStar,
    inSideBar: true,
  },
  influencers: {
    path: '/influencers',
    name: 'المؤثرين',
    icon: People,
    inSideBar: true,
  },
  campaigns: {
    path: '/campaigns',
    name: 'الحملات الإعلانية',
    icon: StatusUp,
    inSideBar: true,
  },
  categories: {
    path: '/categories',
    name: 'التصنيفات',
    icon: Category2,
    inSideBar: true,
  },
  communicationRequests: {
    path: '/communication-requests',
    name: 'طلبات التواصل',
    icon: TagUser,
    inSideBar: true,
  },
  moderators: {
    path: '/moderators',
    name: 'المشرفون',
    icon: UserSquare,
    inSideBar: true,
  },
  companies: {
    path: '/companies',
    name: 'الشركات',
    icon: Buildings2,
    inSideBar: true,
  },
  customerOpinions: {
    path: '/testimonials',
    name: 'آراء العملاء',
    icon: SmsStar,
    inSideBar: true,
  },
  login: {
    path: '/login',
    name: 'تسجيل الدخول',
    icon: SmsStar,
    inSideBar: false,
  },
  forgetPassword: {
    path: '/forget-password',
    name: 'نسيت كلمة المرور',
    icon: SmsStar,
    inSideBar: false,
  },
  otpVarification: {
    path: '/otp-varification',
    name: 'كود التحقق',
    icon: SmsStar,
    inSideBar: false,
  },
  resetPassword: {
    path: '/reset-password',
    name: 'إعادة تعيين كلمة المرور',
    icon: SmsStar,
    inSideBar: false,
  },
  passwordResetSuccess: {
    path: '/password-reset-success',
    name: 'تم تغيير كلمة المرور',
    icon: SmsStar,
    inSideBar: false,
  },
};

export const PROTECTED_ROUTES = [
  '/brand',
  '/influencers',
  '/campaigns',
  '/sections',
  '/communication-requests',
  '/moderators',
  '/companies',
  '/testimonials',
];
