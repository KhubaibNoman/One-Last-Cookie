import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const rawUrl = process.env.DATABASE_URL || '';
export const isDatabaseConfigured = Boolean(
  rawUrl &&
  !rawUrl.includes('ep-xxx') &&
  !rawUrl.includes('user:password')
);

const sql = isDatabaseConfigured ? neon(rawUrl) : ((() => Promise.resolve([])) as any);
export const db = isDatabaseConfigured ? drizzle(sql, { schema }) : ({} as any);
export { sql };
