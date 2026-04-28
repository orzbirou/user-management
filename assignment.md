# Test Assignment: Angular Developer

**Goal:** Test key skills in Angular, NgRx, and Reactive Forms

## Technical Requirements

### 1. Project Setup

- Angular 19+
- NgRx Store (minimal setup)
- Reactive Forms

### 2. Data Model

```typescript
export interface User {
  id: number;
  email: string;
  username: string;
  age: number;
}
```

### 3. NgRx Store

**State:**

```typescript
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
```

**Example NGRX files:**

- `store/actions/user.actions.ts` (minimum 3 actions)
- `store/reducers/user.reducer.ts`
- `store/effects/user.effects.ts`
- `store/selectors/user.selectors.ts`

**Effect:**

- Simulate HTTP request with 500ms delay
- Mock data: 3-5 users

**Example mock data for Effect:**

```typescript
const MOCK_USERS: User[] = [
  { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
  { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
  { id: 3, email: 'admin@example.com', username: 'admin', age: 35 },
  { id: 4, email: 'test@test.com', username: 'test_user', age: 22 },
];
```

### 4. User List Component

**Requirements:**

- Load data on initialization via NgRx
- Display states:
  - Loading spinner/text
  - Error message
  - User list (table or div)
- Columns: id, email, username, age, actions
- "Delete" button with confirmation (output "deleted" data to `console.log` is fine)
- "Edit" button - navigate to edit form

### 5. User Edit Form

**Form fields (FormGroup):**

- **email** (FormControl)
  - `required`
  - email format validator
  - Show error: "Email is required", "Invalid email format"

- **username** (FormControl)
  - `required`
  - `minLength: 3`, `maxLength: 20`
  - `pattern`: only Latin letters, numbers, and `_`
  - validation: cannot be `admin`
  - Show errors

- **age** (FormControl)
  - `required`
  - validation: from 18 to 100 years
  - Show error: "Age must be between 18 and 100"

**Validation:**

- Show errors under each field
- "Save" button disabled if:
  - form is invalid
  - form is pristine (unchanged)
- On submit: output data to `console.log`

### 6. Minimal UI/UX

- Use SCSS or Angular Material
- Show validation errors (red color, text)
- Button states (disabled/enabled)
- No need for responsiveness or fancy design