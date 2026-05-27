import {and, desc, eq} from 'drizzle-orm';

// /data/link.ts
import {db} from '@/db'; // adjust path if needed
import {links} from '@/db/schema'; // your table

// ✅ Get user links
export async function getUserLinks(userId: string) {
    return await db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(desc(links.updatedAt));
}

// ✅ Create link
export async function createLink(data: {
    userId: string;
    url: string;
    shortCode: string;
}) {
    return await db.insert(links).values(data).returning();
}

// ✅ Update link
export async function updateLink(data: {id: number; url: string}) {
    return await db
        .update(links)
        .set({url: data.url, updatedAt: new Date()})
        .where(eq(links.id, data.id));
}

// ✅ Delete link
export async function deleteLink(id: number, userId: string) {
    return await db
        .delete(links)
        .where(and(eq(links.id, id), eq(links.userId, userId)));
}

// ✅ Get link by short code
export async function getLinkByShortCode(shortCode: string) {
    const result = await db
        .select()
        .from(links)
        .where(eq(links.shortCode, shortCode))
        .limit(1);

    return result[0];
}
