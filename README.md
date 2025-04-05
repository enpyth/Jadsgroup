# Jadsgroup

## Workflow

![](./docs/imgs/FlowChart_rent.svg)

![](./docs/imgs/FlowChart_repair.svg)

## Class Diagram

![](./docs/imgs/classDiagram.svg)

---

# operation

## db table update

    npx drizzle-kit push


## seed data

    pnpm tsx src/scripts/seed.ts

---

# Page Design

## tenant

1. show lease table

select * from lease where session.user.email == tenant.email

## admin

1. show all property table

2. show lease table when the property is choosen

## owner

1. show owners' property table

# TODO

compress public resources 