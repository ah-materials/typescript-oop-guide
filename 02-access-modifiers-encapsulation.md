# Access Modifiers & Encapsulation

## What is Encapsulation?

Encapsulation is hiding internal implementation details and exposing only what's necessary. It protects data from direct access and modification.

## Access Modifiers

### `public` - Accessible Everywhere (Default)

```typescript
class Car {
  public brand: string; // Can be accessed anywhere

  constructor(brand: string) {
    this.brand = brand;
  }
}

const car = new Car("Toyota");
console.log(car.brand); // ✅ OK - public property
car.brand = "Honda";    // ✅ OK - can modify
```

### `private` - Only Within the Class

```typescript
class BankAccount {
  private balance: number; // Only accessible inside BankAccount

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount; // ✅ OK - within class
  }

  getBalance(): number {
    return this.balance; // ✅ OK - within class
  }
}

const account = new BankAccount(1000);
console.log(account.balance); // ❌ Error - private property
console.log(account.getBalance()); // ✅ OK - public method
```

### `protected` - Within Class and Subclasses

```typescript
class Animal {
  protected species: string; // Accessible in Animal and subclasses

  constructor(species: string) {
    this.species = species;
  }
}

class Dog extends Animal {
  describe(): string {
    return `This is a ${this.species}`; // ✅ OK - in subclass
  }
}

const dog = new Dog("Canis familiaris");
console.log(dog.species); // ❌ Error - protected property
console.log(dog.describe()); // ✅ OK
```

### `readonly` - Can Only Be Set During Initialization

```typescript
class Configuration {
  readonly apiKey: string;
  readonly maxRetries: number = 3; // Can set default

  constructor(apiKey: string) {
    this.apiKey = apiKey; // ✅ OK - in constructor
  }

  updateApiKey(newKey: string): void {
    this.apiKey = newKey; // ❌ Error - cannot reassign readonly
  }
}

const config = new Configuration("abc123");
config.apiKey = "xyz789"; // ❌ Error - readonly property
```

### `static` - Belongs to Class, Not Instances

**When to use `static`:**
- Utility functions related to the class
- Shared constants
- Factory methods
- Counters tracking all instances

```typescript
class MathUtils {
  // Static property - shared across all instances
  static PI: number = 3.14159;
  static instanceCount: number = 0;

  // Static method - called on class, not instance
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  // Static factory method
  static createCalculator(): Calculator {
    return new Calculator();
  }

  constructor() {
    MathUtils.instanceCount++; // Access static via class name
  }
}

// Calling static members on the CLASS, not instance
console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(5, 3));    // 8

const calc = new MathUtils();
console.log(MathUtils.instanceCount); // 1
// console.log(calc.add(5, 3));       // ❌ Error - static method
```

### Real-World Static Example

```typescript
class User {
  private static nextId: number = 1;
  private static users: Map<number, User> = new Map();

  readonly id: number;

  constructor(public username: string) {
    this.id = User.nextId++;
    User.users.set(this.id, this);
  }

  static getUserById(id: number): User | undefined {
    return User.users.get(id);
  }

  static getTotalUsers(): number {
    return User.users.size;
  }

  static deleteUser(id: number): boolean {
    return User.users.delete(id);
  }
}

const user1 = new User("alice");
const user2 = new User("bob");
console.log(User.getTotalUsers());      // 2
console.log(User.getUserById(1));       // User { id: 1, username: "alice" }
```

## Combining Access Modifiers

```typescript
class Employee {
  // Public and readonly
  public readonly id: number;

  // Private and static
  private static nextId: number = 1000;

  // Protected and readonly
  protected readonly hireDate: Date;

  constructor(public name: string) {
    this.id = Employee.nextId++;
    this.hireDate = new Date();
  }
}
```

## Naming Conventions for Private Members

```typescript
class Person {
  // Convention: prefix private properties with underscore
  private _age: number;
  private _email: string;

  constructor(age: number, email: string) {
    this._age = age;
    this._email = email;
  }

  // Public methods to access private data
  getAge(): number {
    return this._age;
  }

  setAge(age: number): void {
    if (age > 0 && age < 150) {
      this._age = age;
    }
  }
}
```
