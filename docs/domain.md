# Restaurant Menu Domain

## Overview

This project models the core business logic of a **restaurant menu management system**.
A restaurant needs to manage its menu items, track stock levels, and update prices over time.
Staff must be notified when stock runs low, and the kitchen must be informed when items are created or updated.

## Domain Concepts

### Menu Item (Entity)
A menu item is a dish or drink offered by the restaurant. It has:
- A **unique ID** — generated automatically, never empty
- A **name** — must be one of the allowed dishes on the menu (e.g. Burger, Pizza, Pasta, Salad, Coffee)
- A **price** — must be a positive number in EUR, representing what the customer pays
- A **stock level** — how many portions are currently available in the kitchen

### Business Rules

1. **Price must be positive** — a menu item cannot be free or have a negative price
2. **Stock cannot be negative** — you cannot have -3 portions of a dish
3. **Quantity ordered must be at least 1** — ordering 0 or negative portions makes no sense
4. **Stock cannot go below zero after an order** — if only 2 Burgers are left, you cannot seat an order of 5
5. **Only known menu items are allowed** — the kitchen only prepares what is on the menu
6. **Price updates must be valid** — you cannot update a price to a negative or zero value

## Domain Events

When something meaningful happens in the domain, an event is emitted:

- **MenuItemCreated** — a new dish has been added to the menu
- **PriceUpdated** — the price of an existing dish has changed (e.g. due to ingredient costs)
- **StockReduced** — an order has been placed and the available portions have decreased

## Observers (Reactions to Events)

When events are emitted, the system reacts:

- **Email notification** — the manager is emailed when stock drops critically low or a new item is created
- **Database log** — every event is persisted to the database for audit and reporting purposes

These reactions are decoupled from the domain logic — the domain simply emits events, and the infrastructure layer decides what to do with them.

## Review
Code reviewed and approved. Observer Pattern and DDD structure are correctly implemented.
