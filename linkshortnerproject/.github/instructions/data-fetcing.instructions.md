---
description: Read this file to understand how to fetch data in the project.
---

# Data fetching guidelines

this document outlines the best practice and guidlines for fetcing data in out next.js application.
Adhering to these guidlines will ensure consistancy, performance and maintainability across the codebase.

## 1. Use server components for data Fetching

In Next.js project ALWAYS use SERVER COMPONENTS for Data Fetching. NEVER use Client components to fetch data. SERVER components allow for better performance and SEO since data is fetched on the server side.

All helper functin in the /data direcotry should be Drizzle ORM for database instructins.
