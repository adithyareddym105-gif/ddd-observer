// ============================================================
// src/index.ts
// Wiring + test runs only.
// No business logic here — just assembling the pieces and
// exercising the domain with valid and invalid data.
// ============================================================

import { createMenuItem, createQuantity, reduceStock, updatePrice } from "./domain/product/factories"
import { emit, registerObserver } from "./infrastructure/observers/observer"
import { sendEmailMock } from "./infrastructure/observers/email"
import { saveToDatabaseMock } from "./infrastructure/observers/database"

// ── Register observers ───────────────────────────────────────
registerObserver(sendEmailMock)
registerObserver(saveToDatabaseMock)

// ── Helper to run a labelled test block ─────────────────────
function test(label: string, fn: () => void): void {
  console.log(`\n--- ${label}`)
  try {
    fn()
  } catch (error) {
    if (error instanceof Error) {
      console.error(`  [CAUGHT] ${error.message}`)
    } else {
      console.error("  [CAUGHT] Unknown error")
    }
  }
}

// ════════════════════════════════════════════════════════════
// VALID SCENARIOS
// ════════════════════════════════════════════════════════════

test("Create a valid Burger menu item", () => {
  const burger = createMenuItem("Burger", 12.5, 10)
  emit({
    type: "MenuItemCreated",
    productId: burger.id,
    name: burger.name,
    price: burger.price,
    stock: burger.stock,
  })
  console.log("  Created:", burger)
})

test("Create a valid Coffee and reduce stock", () => {
  const coffee = createMenuItem("Coffee", 3.5, 5)
  emit({
    type: "MenuItemCreated",
    productId: coffee.id,
    name: coffee.name,
    price: coffee.price,
    stock: coffee.stock,
  })

  const qty = createQuantity(3)
  const updated = reduceStock(coffee, qty)
  emit({
    type: "StockReduced",
    productId: updated.id,
    name: updated.name,
    newLevel: updated.stock,
    quantity: qty,
  })
  console.log("  After order:", updated)
})

test("Update price of a Pizza", () => {
  const pizza = createMenuItem("Pizza", 14.0, 8)
  const oldPrice = pizza.price
  const updated = updatePrice(pizza, 16.5)
  emit({
    type: "PriceUpdated",
    productId: updated.id,
    oldPrice,
    newPrice: updated.price,
  })
  console.log("  Updated pizza:", updated)
})

test("Reduce stock to trigger low-stock email (threshold ≤ 3)", () => {
  const pasta = createMenuItem("Pasta", 11.0, 4)
  const qty = createQuantity(2)
  const updated = reduceStock(pasta, qty)
  emit({
    type: "StockReduced",
    productId: updated.id,
    name: updated.name,
    newLevel: updated.stock,   // 2 — below threshold, email fires
    quantity: qty,
  })
  console.log("  After order:", updated)
})

// ════════════════════════════════════════════════════════════
// INVALID SCENARIOS — all must be caught, none should crash
// ════════════════════════════════════════════════════════════

test("Negative price — must be rejected", () => {
  createMenuItem("Burger", -5, 10)
})

test("Zero price — must be rejected", () => {
  createMenuItem("Salad", 0, 10)
})

test("Unknown menu item name — must be rejected", () => {
  createMenuItem("Sushi", 18.0, 5)
})

test("Negative stock — must be rejected", () => {
  createMenuItem("Coffee", 3.5, -1)
})

test("Fractional quantity — must be rejected", () => {
  createQuantity(1.5)
})

test("Zero quantity — must be rejected", () => {
  createQuantity(0)
})

test("Order exceeds available stock — must be rejected", () => {
  const salad = createMenuItem("Salad", 8.0, 2)
  const qty = createQuantity(5)   // only 2 in stock
  reduceStock(salad, qty)
})

test("Update price to negative — must be rejected", () => {
  const burger = createMenuItem("Burger", 12.5, 10)
  updatePrice(burger, -3)
})

console.log("\nAll tests complete.")
