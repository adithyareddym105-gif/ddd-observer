// ============================================================
// src/domain/product/product.ts
// The MenuItem entity — uses branded types, never raw primitives
// ============================================================

import { ProductId, ProductName, PriceNumber, StockLevel } from "./types"

export type MenuItem = {
  id: ProductId
  name: ProductName
  price: PriceNumber
  stock: StockLevel
}
