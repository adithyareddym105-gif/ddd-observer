// ============================================================
// src/domain/product/factories.ts
// Smart constructors and factory functions.
// All business rules live here — invalid data is rejected at creation.
// ============================================================

// Simple UUID v4 generator — no external dependencies needed
function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
import {
  ProductId,
  ProductName,
  PriceNumber,
  StockLevel,
  Quantity,
  ALLOWED_NAMES,
} from "./types"
import { MenuItem } from "./product"

// ── Branded type constructors ────────────────────────────────

export function createPrice(value: number): PriceNumber {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error(`Price must be a number (got ${value})`)
  }
  if (value <= 0) {
    throw new Error(`Price must be positive (got ${value})`)
  }
  return value as PriceNumber
}

export function createStockLevel(value: number): StockLevel {
  if (!Number.isInteger(value)) {
    throw new Error(`Stock level must be a whole number (got ${value})`)
  }
  if (value < 0) {
    throw new Error(`Stock level cannot be negative (got ${value})`)
  }
  return value as StockLevel
}

export function createQuantity(value: number): Quantity {
  if (!Number.isInteger(value)) {
    throw new Error(`Quantity must be a whole number (got ${value})`)
  }
  if (value <= 0) {
    throw new Error(`Quantity must be at least 1 (got ${value})`)
  }
  return value as Quantity
}

export function createProductName(value: string): ProductName {
  const trimmed = value.trim()
  if (!ALLOWED_NAMES.includes(trimmed as typeof ALLOWED_NAMES[number])) {
    throw new Error(
      `"${value}" is not on the menu. Allowed items: ${ALLOWED_NAMES.join(", ")}`
    )
  }
  return trimmed as ProductName
}

// ── Entity factory ───────────────────────────────────────────

export function createMenuItem(
  name: string,
  price: number,
  stock: number
): MenuItem {
  return {
    id: uuidv4() as ProductId,
    name: createProductName(name),
    price: createPrice(price),
    stock: createStockLevel(stock),
  }
}

// ── Domain operation ─────────────────────────────────────────

export function reduceStock(item: MenuItem, quantity: Quantity): MenuItem {
  const newStock = item.stock - quantity
  if (newStock < 0) {
    throw new Error(
      `Not enough stock for "${item.name}": requested ${quantity}, available ${item.stock}`
    )
  }
  return {
    ...item,
    stock: createStockLevel(newStock),
  }
}

export function updatePrice(item: MenuItem, newPrice: number): MenuItem {
  return {
    ...item,
    price: createPrice(newPrice),
  }
}
