# Jadsgroup

## Workflow

![](./docs/imgs/FlowChart_rent.svg)

![](./docs/imgs/FlowChart_repair.svg)

## Class Diagram

![](./docs/imgs/classDiagram.svg)

---

# DB Operation

## rebuilding db by current scheme

1. login to db, use sql drop all table 
    ```
    DROP TABLE IF EXISTS 
    agents, 
    leases, 
    owners, 
    properties, 
    CASCADE;
    ```
2. delete drizzle migration file
    ```
    $ rm -rf drizzle/
    ```
3. push table structure to db
    ```
    $ npx drizzle-kit generate
    $ npx drizzle-kit push
    ```
4. seed data
    ```
    $ pnpm tsx src/scripts/seed.ts
    ```

## update db tables

only execute no.3 step `push table structure to db`

---

# Non-Functional TODO

## Code Arch

Abstract features components into common components

## Optimization

add db index, redis

## PROD

### object db

- Change setting in R2, replace Public Access to Custom Domain. 
- Update CLOUDFLARE_R2_PUBLIC_URL in env file.
- Update domains in next.config.js

### other

Compress public resources.

### data clean rules

- delete invaild lease item(file, image) in 'leases' table.
