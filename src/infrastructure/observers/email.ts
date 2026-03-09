// ============================================================
// src/infrastructure/observers/email.ts
// Mock email notification observer.
// Sends alerts when items are created or stock drops low.
// ============================================================

import { DomainEvent } from "../../domain/events/events"

const LOW_STOCK_THRESHOLD = 3

export const sendEmailMock = (event: DomainEvent): void => {
  if (event.type === "MenuItemCreated") {
    console.log(
      `  [EMAIL] New menu item alert — "${event.name}" added at €${event.price.toFixed(2)}`
    )
  } else if (event.type === "StockReduced" && event.newLevel <= LOW_STOCK_THRESHOLD) {
    console.log(
      `  [EMAIL] Low stock warning — "${event.name}" has only ${event.newLevel} portions left!`
    )
  } else if (event.type === "PriceUpdated") {
    console.log(
      `  [EMAIL] Price change — item ${event.productId.slice(0, 8)} updated from €${event.oldPrice.toFixed(2)} to €${event.newPrice.toFixed(2)}`
    )
  }
}
