import { eq } from 'drizzle-orm';

// /data/link.ts
import { db } from '@/db'; // adjust path if needed
import { links } from '@/db/schema'; // your table

export async function getUserLinks(userId: string) {
    console.log(userId);
    return await db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(links.createdAt);
}
