import {drizzle} from 'drizzle-orm/neon-http';

import {links} from './schema';

const db = drizzle(process.env.DATABASE_URL!);

export {db, links};
