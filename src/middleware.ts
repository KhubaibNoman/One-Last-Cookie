import { authConfig } from '@/lib/auth.config';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
  matcher: ['/admin/:path*'],
};
