
export type LocalUser = {
  id: string;
  email: string;
  name: string;
  password: string;  
  role?: string;
};

export const localUsers: LocalUser[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    password: 'admin123',   
    role: 'admin',
  },
  {
    id: '2',
    email: 'user@example.com',
    name: 'Regular User',
    password: 'user123',    
    role: 'user',
  },
];

export function verifyLocalUser(
  email: string,
  password: string,
): Omit<LocalUser, 'password'> | null {
  const user = localUsers.find(
    u => u.email.toLowerCase() === email.toLowerCase(),
  );
  if (!user) return null;
  if (user.password !== password) return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
