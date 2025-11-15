# TypeScript OOP Exercises

Complete each exercise in order and share your solution for review before moving to the next one.

---

## Exercise 1: Basic Classes

Create a `Book` class with:

**Properties:**
- `title` (string)
- `author` (string)
- `pages` (number)
- `currentPage` (number, starts at 0)

**Methods:**
- `read(numPages: number)` - increases currentPage by numPages (can't exceed total pages)
- `getProgress()` - returns percentage read as a number (0-100)
- `toString()` - returns a description of the book

**Example usage:**
```typescript
const book = new Book("1984", "George Orwell", 328);
book.read(50);
console.log(book.getProgress()); // ~15.24
console.log(book.toString()); // "1984 by George Orwell (328 pages, 15% read)"
```

---

## Exercise 2: Access Modifiers

Create a `User` class with:

**Properties:**
- Public: `username` (string)
- Private: `password` (string), `email` (string)
- Protected: `createdAt` (Date)

**Methods:**
- `authenticate(password: string): boolean` - checks if password matches
- `updateEmail(newEmail: string, password: string): boolean` - only updates if password is correct, returns true if successful
- `getAccountAge(): number` - returns days since account creation

**Example usage:**
```typescript
const user = new User("alice", "secret123", "alice@example.com");
console.log(user.authenticate("wrongpass")); // false
console.log(user.authenticate("secret123")); // true
console.log(user.updateEmail("newemail@example.com", "secret123")); // true
console.log(user.getAccountAge()); // 0 (just created)
```

---

## Exercise 3: Getters and Setters

Create a `Rectangle` class with:

**Private Properties:**
- `_width` (number)
- `_height` (number)

**Getters/Setters:**
- `width` - getter/setter (must be positive)
- `height` - getter/setter (must be positive)
- `area` - getter only (computed: width * height)
- `perimeter` - getter only (computed: 2 * (width + height))
- `square` - getter/setter (boolean):
  - Getter: returns true if width === height
  - Setter: when set to true, makes height equal to width

**Example usage:**
```typescript
const rect = new Rectangle(5, 10);
console.log(rect.area);      // 50
console.log(rect.perimeter); // 30
console.log(rect.square);    // false

rect.square = true;
console.log(rect.width);     // 5
console.log(rect.height);    // 5
console.log(rect.square);    // true
```

---

## Exercise 4: Inheritance

Create an `Employee` base class and two subclasses:

**Employee (abstract or base class):**
- Properties: `name` (string), `id` (number), `baseSalary` (number)
- Methods: `abstract calculatePay(): number`, `getDetails(): string`

**FullTimeEmployee extends Employee:**
- Additional property: `benefits` (number)
- `calculatePay()` returns baseSalary + benefits

**ContractEmployee extends Employee:**
- Additional properties: `hourlyRate` (number), `hoursWorked` (number)
- `calculatePay()` returns hourlyRate * hoursWorked
- Additional method: `logHours(hours: number)` - adds to hoursWorked

**Example usage:**
```typescript
const fullTime = new FullTimeEmployee("Alice", 1, 5000, 1000);
const contract = new ContractEmployee("Bob", 2, 50, 160);

console.log(fullTime.calculatePay());  // 6000
console.log(contract.calculatePay());  // 8000

contract.logHours(20);
console.log(contract.calculatePay());  // 9000
```

---

## Exercise 5: Abstract Classes

Create an abstract `Vehicle` class and concrete implementations:

**Abstract Vehicle:**
- Properties: `brand` (string), `model` (string)
- Abstract methods: `startEngine(): void`, `fuelEfficiency(): number`
- Concrete method: `getInfo(): string` - returns vehicle description

**Car extends Vehicle:**
- Additional property: `numDoors` (number)
- Implement `startEngine()` with car-specific message
- Implement `fuelEfficiency()` to return miles per gallon

**Motorcycle extends Vehicle:**
- Additional property: `hasSidecar` (boolean)
- Implement `startEngine()` with motorcycle-specific message
- Implement `fuelEfficiency()` to return miles per gallon

**Example usage:**
```typescript
const car = new Car("Toyota", "Camry", 4);
const bike = new Motorcycle("Harley", "Sportster", false);

car.startEngine();      // "Car engine started: Vroom!"
bike.startEngine();     // "Motorcycle engine started: Roar!"

console.log(car.fuelEfficiency());  // e.g., 30
console.log(bike.fuelEfficiency()); // e.g., 50
```

---

## Exercise 6: Interfaces and Polymorphism

Create a task management system:

**Interface Task:**
- Properties: `id` (number), `title` (string), `completed` (boolean)
- Methods: `complete(): void`, `isComplete(): boolean`

**Interface Schedulable:**
- Properties: `dueDate` (Date)
- Methods: `isOverdue(): boolean`

**Class TodoTask implements Task:**
- Implement all Task interface requirements

**Class ScheduledTask implements Task, Schedulable:**
- Implement both Task and Schedulable interface requirements
- `isOverdue()` should check if current date is past dueDate

**Function completeAllTasks:**
- Takes an array of Task objects
- Calls `complete()` on each task
- Demonstrates polymorphism

**Example usage:**
```typescript
const todo = new TodoTask(1, "Buy groceries");
const scheduled = new ScheduledTask(2, "Submit report", new Date("2025-01-15"));

console.log(todo.isComplete());      // false
todo.complete();
console.log(todo.isComplete());      // true

console.log(scheduled.isOverdue());  // depends on current date

const tasks: Task[] = [todo, scheduled];
completeAllTasks(tasks); // Completes all tasks regardless of type
```

---

## Submission Instructions

1. Create a TypeScript file for each exercise (e.g., `exercise1.ts`, `exercise2.ts`, etc.)
2. Complete one exercise at a time
3. Share your solution code
4. Wait for review and feedback before proceeding to the next exercise

Good luck! Start with Exercise 1 when you're ready.
