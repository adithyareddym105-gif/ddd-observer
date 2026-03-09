// ============================================================
// src/infrastructure/observers/observer.ts
// Observer type + central registry.
// Domain emits events here; all registered observers are called.
// ============================================================

import { DomainEvent } from "../../domain/events/events"

export type Observer = (event: DomainEvent) => void

// Central observer registry
const observers: Observer[] = []

export function registerObserver(observer: Observer): void {
  observers.push(observer)
}

export function emit(event: DomainEvent): void {
  console.log(`\n[EVENT] ${event.type}`)
  for (const observer of observers) {
    observer(event)
  }
}
