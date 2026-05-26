import {sql} from 'drizzle-orm';
import {integer, pgTable, text, timestamp, varchar} from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
    id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
    userId: varchar('user_id', {length: 255}).notNull(),
    shortCode: varchar('short_code', {length: 64}).notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        precision: 6,
    }).default(sql`now()`),
    updatedAt: timestamp('updated_at', {
        withTimezone: true,
        precision: 6,
    }).default(sql`now()`),
});

// export const linksShortCodeIndex = uniqueIndex('links_short_code_idx').on(
//     links.shortCode,
// );

// export type Link = InferModel<typeof links>;
// export type NewLink = InferModel<typeof links, 'insert'>;
