// ============================================================
// src/domain/product/types.ts
// All branded primitive types for the restaurant menu domain
// ============================================================

export type ProductId = string & { readonly __brand: "ProductId" }

export type ProductName = string & { readonly __brand: "ProductName" }

export type PriceNumber = number & { readonly __brand: "PriceNumber" }

export type StockLevel = number & { readonly __brand: "StockLevel" }

export type Quantity = number & { readonly __brand: "Quantity" }

// Allowed menu item names — enforced at the type level
export const ALLOWED_NAMES = ["Burger", "Pizza", "Pasta", "Salad", "Coffee"] as const
export type AllowedName = typeof ALLOWED_NAMES[number]
