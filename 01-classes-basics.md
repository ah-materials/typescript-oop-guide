# Classes - The Foundation

## Anatomy of a Class

```typescript
class ClassName {
  // Properties (fields/attributes)
  // Methods (functions)
  // Constructor
  // Getters/Setters
  // Static members
}
```

## Naming Conventions

- **Classes**: PascalCase (e.g., `UserAccount`, `ShoppingCart`, `HTTPClient`)
- **Properties**: camelCase (e.g., `firstName`, `totalAmount`, `isActive`)
- **Methods**: camelCase (e.g., `calculateTotal()`, `getUserData()`)
- **Private properties**: prefix with underscore `_propertyName` (convention, not required)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`, `DEFAULT_TIMEOUT`)

## Basic Class Example

```typescript
class Person {
  // Property declarations with types
  name: string;
  age: number;
  email: string;

  // Constructor - special method called when creating new instances
  constructor(name: string, age: number, email: string) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  // Instance method
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
  }

  // Method with parameters
  celebrateBirthday(): void {
    this.age++;
    console.log(`Happy birthday! Now ${this.age} years old`);
  }
}

// Creating instances (objects)
const person1 = new Person("Alice", 30, "alice@example.com");
const person2 = new Person("Bob", 25, "bob@example.com");

console.log(person1.greet()); // "Hello, I'm Alice and I'm 30 years old"
person1.celebrateBirthday();  // age becomes 31
```

## Constructor Shorthand (Parameter Properties)

```typescript
// Traditional way
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

// Shorthand - automatic property declaration and assignment
class Product {
  constructor(public name: string, public price: number) {
    // No need to manually assign!
  }
}
```

## Optional and Default Parameters

```typescript
class User {
  constructor(
    public username: string,
    public email: string,
    public age?: number,              // Optional parameter
    public role: string = "user"      // Default parameter
  ) {}
}

const user1 = new User("alice", "alice@example.com");
const user2 = new User("bob", "bob@example.com", 25, "admin");
```

## The `this` Keyword

- Refers to the current instance of the class
- Used to access properties and methods within the class
- Context can change with arrow functions vs regular functions

```typescript
class Counter {
  private count: number = 0;

  increment(): void {
    this.count++; // 'this' refers to the current Counter instance
  }

  getCount(): number {
    return this.count;
  }

  // Arrow function preserves 'this' context
  incrementAsync = (): void => {
    setTimeout(() => {
      this.count++; // 'this' still refers to Counter instance
    }, 1000);
  }
}
```
