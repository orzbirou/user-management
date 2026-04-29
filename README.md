# Angular User Management

A test assignment demonstrating Angular 20, NgRx, Reactive Forms, and Angular Material best practices.

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | 18+ |
| Angular CLI | `npm i -g @angular/cli@20` |

---

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Start the development server**

```bash
ng serve
```

**3. Open the application**

```
http://localhost:4200
```

---

## Running Tests

```bash
npm test
```

---

## Architecture Decisions

### Standalone Components & Signals

Every component is declared with `standalone: true` and imports only what it needs directly in its `@Component` decorator. There are no `NgModule` files. This reduces boilerplate, improves tree-shaking, and makes each component self-documenting.

UI state is consumed via `store.selectSignal()` instead of Observables + `AsyncPipe`. Signals integrate natively with Angular's reactivity graph: when a signal's value changes, only the components that read it are scheduled for re-render — no manual subscriptions, no `takeUntilDestroyed`, no memory-leak risk.

### NgRx Store with Entity Adapter

The users collection is managed by `@ngrx/entity`'s `createEntityAdapter`. This provides two key benefits over a plain array in state:

- **Performance** — Users are stored as a dictionary (`entities: Record<id, User>`) alongside an ordered `ids` array. Looking up a single user by ID is O(1) instead of O(n).
- **Simplicity** — `setAll`, `updateOne`, and `removeOne` replace manual `map` / `filter` / spread operations in the reducer, eliminating a common source of bugs.

Selectors are built with `createSelector`, which memoises results using strict reference equality. A selector's projector function only re-runs when its input slice actually changes, preventing unnecessary recomputation downstream.

### Smart / Dumb Component Pattern

The edit form is split into two components with clearly separated responsibilities:

| Component | Type | Knows about |
|---|---|---|
| `UserEditComponent` | Smart (Container) | NgRx Store, Router, `ActivatedRoute` |
| `UserFormComponent` | Dumb (Presentational) | Reactive Forms, Angular Material |

`UserEditComponent` reads the `:id` route parameter, selects the matching `User` from the store via `store.selectSignal(selectUserById(id))`, and passes it down via a signal `input()`. It handles the submit and cancel events by navigating back to `/`.

`UserFormComponent` owns the `FormGroup`, all validators, and all error messages. It receives `User | undefined` as an input signal and emits form values as outputs. It has zero knowledge of routing, the store, or NgRx — making it fully reusable. It is placed in `src/app/shared/components/` because it carries no feature-specific logic and could be used by any future feature (e.g. an "Add User" page) without modification.

### OnPush Change Detection

Every component is decorated with `changeDetection: ChangeDetectionStrategy.OnPush`. Angular skips the component's view during its default change-detection walk and only re-evaluates it when:

- A signal it reads emits a new value, or
- An `@Input()` reference changes, or
- An event originating inside the component fires.

Combined with memoised NgRx selectors (which only emit new references when data actually changes), this means the DOM is updated with surgical precision rather than on every browser event.

---

## Assumptions & Scope

### Console logging instead of live mutation

Per the assignment specification:

- **Edit form submit** — the updated `User` object is output to `console.log`. No `updateUser` action is dispatched.
- **Delete confirmation** — after confirming, the deleted `User` object is output to `console.log`. No `deleteUser` action is dispatched.

The NgRx store wiring for `updateUser` and `deleteUser` (actions, reducer handlers, effects) is fully implemented to demonstrate architecture knowledge. The decision to log rather than dispatch on the UI is a deliberate compliance with the assignment's stated requirements.

### Simulated 500 ms network delay

The `loadUsers$` effect uses `delay(500)` on an in-memory mock array to simulate a real HTTP response. During this window, `loading` is `true` in the store and the list component shows a Material spinner. This demonstrates the full loading → success → error state cycle without requiring a backend.

### No backend / no persistence

Data lives in the NgRx store for the duration of the browser session. A page refresh resets the store to the original mock data. This is expected behaviour for an in-memory assignment.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (Standalone, Signals) |
| State management | NgRx 20 (Store, Effects, Entity) |
| UI components | Angular Material 20 |
| Forms | Angular Reactive Forms |
| Styling | SCSS with BEM methodology |
| Language | TypeScript 5.8 |
