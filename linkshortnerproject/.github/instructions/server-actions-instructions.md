# Server Actions Instructions

## Overview

All data mutation in this app should be done via server actions. Server actions must be called from client components. Server actions file MUST be called `actions.ts` and be colocated in the directory of the component that calls the server action.

## Data Validation

All data passed to server actions must have appropriate TypeScript types. Do not use the `FormData` TypeScript type. All data must be validated in server actions via Zod.

## User Authentication

All server actions must check for a logged-in user before continuing with database operations. If the user is not logged in, the server action should return an error.

## Database Operations

Database operations must be done via helper functions that wrap Drizzle queries. These helper functions are located in the [/data](cci:7://file:///c:/Users/Pradeep.Padmukhi/Desktop/Pradeep_udemy/AI_for_developers/linkshortnerproject/data:0:0-0:0) directory. Server actions should NOT directly use Drizzle queries within them.

## Error Handling

Server actions should not throw any errors. Instead, they should return an object with an `error` or `success` property.

## Example

Here's an example of how a server action could be implemented:

```typescript
import { z } from 'zod';
import { createPost } from './data/helpers';

export const createPostAction = async (data: CreatePostData) => {
  // Validate data using Zod
  const validatedData = CreatePostDataSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: validatedData.error };
  }

  // Check if user is logged in
  if (!user.isLoggedIn) {
    return { error: 'User is not logged in' };
  }

  // Call the helper function to create the post
  const post = await createPost(user.id, data.title, data.content);

  if (!post) {
    return { error: 'Failed to create post' };
  }

  return { success: true };
};
