'use server';

import { nanoid } from 'nanoid';
import { z } from 'zod';

import { auth } from '@clerk/nextjs/server';

import { createLink, deleteLink, updateLink } from '../../data/links';

// ✅ Zod schema
const createLinkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
});

// ✅ Short code schema (optional extra validation layer)
const shortCodeSchema = z
  .string()
  .min(6)
  .max(10)
  .regex(/^[a-zA-Z0-9_-]+$/);

export async function createLinkAction(input: { url: string }) {
  // ✅ Validate input
  const parsed = createLinkSchema.safeParse(input);

  if (!parsed.success) {
    const zodError = parsed.error.flatten().fieldErrors;
    return { error: zodError };
  }

  // ✅ Auth check
  const { userId } = await auth();
  if (!userId) {
    return { error: { auth: ['Unauthorized'] } };
  }

  try {
    // ✅ Generate nanoid short code
    const rawCode = nanoid(6);

    // ✅ Validate generated code with Zod (extra safety)
    const shortCodeParsed = shortCodeSchema.safeParse(rawCode);

    if (!shortCodeParsed.success) {
      return {
        error: { shortCode: ['Invalid generated shortcode'] },
      };
    }

    await createLink({
      userId,
      url: parsed.data.url,
      shortCode: shortCodeParsed.data,
    });

    return { success: true };
  } catch (err) {
    return {
      error: {
        server: [err instanceof Error ? err.message : 'Failed to create link'],
      },
    };
  }
}

const updateSchema = z.object({
  id: z.number(),
  url: z.string().url('Invalid URL'),
});

export async function updateLinkAction(input: { id: number; url: string }) {
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: { auth: ['Unauthorized'] } };
  }

  try {
    await updateLink({
      id: parsed.data.id,
      url: parsed.data.url,
    });

    return { success: true };
  } catch (err) {
    return {
      error: {
        server: [err instanceof Error ? err.message : 'Failed to update link'],
      },
    };
  }
}

// ✅ Delete
const deleteSchema = z.object({
  id: z.number(),
});

export async function deleteLinkAction(input: { id: number }) {
  const parsed = deleteSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: { auth: ['Unauthorized'] } };
  }

  try {
    await deleteLink(parsed.data.id, userId);
    return { success: true };
  } catch (err) {
    return {
      error: {
        server: [err instanceof Error ? err.message : 'Failed to delete link'],
      },
    };
  }
}
