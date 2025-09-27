import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
  }
}
