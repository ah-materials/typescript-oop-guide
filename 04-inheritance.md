# Inheritance

## What is Inheritance?

Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass). Promotes code reuse and establishes relationships.

## Keywords

- `extends` - Creates inheritance relationship
- `super()` - Calls parent constructor (required in child constructor)
- `super.method()` - Calls parent method
- `override` - (Optional in TS) Explicitly marks overridden methods

## Basic Inheritance

```typescript
// Parent/Base/Superclass
class Animal {
  constructor(public name: string, public age: number) {}

  makeSound(): void {
    console.log("Some generic animal sound");
  }

  sleep(): void {
    console.log(`${this.name} is sleeping`);
  }
}

// Child/Derived/Subclass
class Dog extends Animal {
  constructor(name: string, age: number, public breed: string) {
    super(name, age); // MUST call parent constructor first
  }

  // Override parent method
  makeSound(): void {
    console.log("Woof! Woof!");
  }

  // New method specific to Dog
  fetch(): void {
    console.log(`${this.name} is fetching the ball`);
  }
}

const dog = new Dog("Buddy", 3, "Golden Retriever");
dog.makeSound(); // "Woof! Woof!" (overridden)
dog.sleep();     // "Buddy is sleeping" (inherited)
dog.fetch();     // "Buddy is fetching the ball" (new method)
```

## Calling Parent Methods with `super`

```typescript
class Vehicle {
  constructor(public brand: string) {}

  start(): void {
    console.log("Vehicle is starting...");
  }
}

class Car extends Vehicle {
  constructor(brand: string, public model: string) {
    super(brand);
  }

  start(): void {
    super.start(); // Call parent's start method
    console.log(`${this.brand} ${this.model} engine started`);
    console.log("All systems ready");
  }
}

const car = new Car("Toyota", "Camry");
car.start();
// Output:
// Vehicle is starting...
// Toyota Camry engine started
// All systems ready
```

## Protected Members in Inheritance

```typescript
class BankAccount {
  protected balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  private interestRate: number;

  constructor(initialBalance: number, interestRate: number) {
    super(initialBalance);
    this.interestRate = interestRate;
  }

  addInterest(): void {
    // Can access protected 'balance' from parent
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Added $${interest} interest`);
  }
}

const savings = new SavingsAccount(1000, 0.05);
savings.addInterest(); // ✅ OK
// savings.balance; // ❌ Error - protected
```

## Multi-Level Inheritance

```typescript
class LivingBeing {
  breathe(): void {
    console.log("Breathing...");
  }
}

class Animal extends LivingBeing {
  move(): void {
    console.log("Moving...");
  }
}

class Mammal extends Animal {
  feedYoung(): void {
    console.log("Feeding young with milk");
  }
}

class Dog extends Mammal {
  bark(): void {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.breathe();   // From LivingBeing
dog.move();      // From Animal
dog.feedYoung(); // From Mammal
dog.bark();      // From Dog
```

## Method Overriding Rules

- Child method must have same or more accessible visibility
- Can't override `private` methods (they're not inherited)
- Can override `protected` and `public` methods

```typescript
class Parent {
  public greet(): void {
    console.log("Hello from parent");
  }
}

class Child extends Parent {
  // ✅ OK - same visibility (public)
  public greet(): void {
    console.log("Hello from child");
  }

  // ❌ Would be error - can't reduce visibility
  // private greet(): void { }
}
```
