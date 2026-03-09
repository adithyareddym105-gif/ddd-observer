// ============================================================
// src/infrastructure/observers/database.ts
// Mock database persistence observer.
// Logs every domain event for audit and reporting.
// ============================================================

import { DomainEvent } from "../../domain/events/events"

export const saveToDatabaseMock = (event: DomainEvent): void => {
  console.log(`  [DB] Persisted event: ${JSON.stringify(event)}`)
}
