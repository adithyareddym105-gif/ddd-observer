// ============================================================
// src/domain/events/events.ts
// All domain events as a discriminated union.
// The observer pattern uses these to react to what happened.
// ============================================================

import { ProductId, ProductName, PriceNumber, StockLevel, Quantity } from "../product/types"

export type MenuItemCreatedEvent = {
  type: "MenuItemCreated"
  productId: ProductId
  name: ProductName
  price: PriceNumber
  stock: StockLevel
}

export type PriceUpdatedEvent = {
  type: "PriceUpdated"
  productId: ProductId
  oldPrice: PriceNumber
  newPrice: PriceNumber
}

export type StockReducedEvent = {
  type: "StockReduced"
  productId: ProductId
  name: ProductName
  newLevel: StockLevel
  quantity: Quantity
}

// Discriminated union — exhaustiveness checking in observers
export type DomainEvent =
  | MenuItemCreatedEvent
  | PriceUpdatedEvent
  | StockReducedEvent
