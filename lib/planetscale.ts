import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface UsersTable {
  username: string;
  autotagcount: number;
  maxallowed?: number;
  updated_at?: string;
}

interface Database {
  users: UsersTable;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});
