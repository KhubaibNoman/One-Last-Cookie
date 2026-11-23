import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { db, isDatabaseConfigured } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        // Master Admin account configured via environment variables or secure default
        const configuredAdminEmail = (process.env.ADMIN_EMAIL || 'admin@onelastcookie.com').toLowerCase();
        const configuredAdminPassword = process.env.ADMIN_PASSWORD || 'OneLastCookieAdmin2026!';

        if (
          email.toLowerCase() === configuredAdminEmail &&
          password === configuredAdminPassword
        ) {
          return {
            id: 'admin-master',
            name: 'Head Baker Admin',
            email: configuredAdminEmail,
            role: 'admin',
          };
        }

        if (!isDatabaseConfigured) {
          return null;
        }

        try {
          const result = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          const user = result[0];
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.passwordHash);
          if (!passwordMatch) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (dbErr) {
          console.error('Auth DB query failed:', dbErr);
          return null;
        }
      },
    }),
  ],
});
