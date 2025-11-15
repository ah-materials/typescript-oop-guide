# Classes - The Foundation

## Understanding the `class` Keyword

The `class` keyword in TypeScript/JavaScript is used to define a blueprint for creating objects. Think of a class as a template or factory that describes:
- **What data** the objects will hold (properties)
- **What actions** the objects can perform (methods)
- **How objects are initialized** (constructor)

```typescript
// This class is a blueprint for creating Person objects
class Person {
  name: string;  // Every Person will have a name
  age: number;   // Every Person will have an age
}
```

When you create a class, you're essentially creating a new custom type that you can use throughout your application.

## Anatomy of a Class

A class can contain several types of members:

```typescript
class ClassName {
  // 1. Properties (fields/attributes) - data that each instance holds
  propertyName: type;

  // 2. Constructor - special method for initialization
  constructor(parameters) {
    // Initialization logic
  }

  // 3. Methods - functions that define behavior
  methodName(): returnType {
    // Method logic
  }

  // 4. Getters/Setters - controlled property access
  get propertyName(): type { }
  set propertyName(value: type) { }

  // 5. Static members - belong to the class itself, not instances
  static staticProperty: type;
  static staticMethod(): returnType { }
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

## Deep Dive: The `constructor` Keyword

### What is a Constructor?

The `constructor` is a **special method** that is automatically called when you create a new instance of a class using the `new` keyword. Its primary purpose is to **initialize** the object's properties and perform any setup needed.

**Key characteristics:**
- Every class can have **at most one** constructor
- If you don't define a constructor, TypeScript provides a default empty one
- The constructor name is always `constructor` (not the class name)
- Constructors don't have a return type (they implicitly return the new instance)
- The constructor is the **first** code that runs when creating an instance

```typescript
class Rectangle {
  width: number;
  height: number;

  // Constructor: called automatically when creating new Rectangle
  constructor(width: number, height: number) {
    console.log("Constructor is running!");

    // Initialize properties using the 'this' keyword
    this.width = width;
    this.height = height;

    // You can run any initialization logic here
    console.log(`Created a ${width}x${height} rectangle`);
  }

  area(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 5);
// Output:
// "Constructor is running!"
// "Created a 10x5 rectangle"
```

### Constructor Execution Flow

Understanding what happens when you create an instance:

```typescript
class Car {
  brand: string;
  model: string;
  year: number;
  mileage: number = 0; // Default value

  constructor(brand: string, model: string, year: number) {
    console.log("1. Constructor starts");

    // Step 1: Memory is allocated for the new object
    // Step 2: Default property values are set (mileage = 0)
    // Step 3: Constructor body executes

    this.brand = brand;
    this.model = model;
    this.year = year;

    console.log("2. Properties initialized");
    // Step 4: The new object is returned automatically
  }
}

console.log("0. About to create car");
const myCar = new Car("Toyota", "Camry", 2024);
console.log("3. Car created and assigned to variable");
```

### Constructor Overloading (TypeScript Pattern)

TypeScript doesn't support multiple constructors, but you can simulate it with optional parameters or function signatures:

```typescript
class User {
  username: string;
  email: string;
  age: number;

  // Single constructor with optional parameters
  constructor(username: string, email: string, age?: number) {
    this.username = username;
    this.email = email;
    this.age = age ?? 18; // Default to 18 if not provided
  }
}

// Different ways to call the same constructor
const user1 = new User("alice", "alice@example.com", 25);
const user2 = new User("bob", "bob@example.com"); // age will be 18

// Alternative: Static factory methods
class Product {
  constructor(
    public name: string,
    public price: number,
    public onSale: boolean
  ) {}

  // Factory method: alternative way to create instances
  static createRegularProduct(name: string, price: number): Product {
    return new Product(name, price, false);
  }

  static createSaleProduct(name: string, price: number): Product {
    return new Product(name, price, true);
  }
}

const regularItem = Product.createRegularProduct("Laptop", 999);
const saleItem = Product.createSaleProduct("Mouse", 25);
```

## Deep Dive: The `new` Keyword

### What Does `new` Do?

The `new` keyword is an operator that creates an instance of a class. When you use `new`, here's exactly what happens behind the scenes:

```typescript
class Book {
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }
}

// When you write this:
const myBook = new Book("1984", "George Orwell");

// Here's what happens step by step:
// 1. A new empty object is created: {}
// 2. The object's prototype is set to Book.prototype
// 3. The constructor function is called with 'this' bound to the new object
// 4. Properties are initialized (this.title = "1984", this.author = "George Orwell")
// 5. The new object is returned and assigned to myBook
```

### What Happens Without `new`?

**Important:** You MUST use `new` when creating class instances. Calling a class like a function will result in an error:

```typescript
class Person {
  constructor(public name: string) {}
}

const person1 = new Person("Alice"); // ✅ Correct
// const person2 = Person("Bob");     // ❌ Error: Class constructor Person cannot be invoked without 'new'
```

### `new` with Different Types

```typescript
// Creating instances with new
const date = new Date();              // Built-in class
const arr = new Array(10);            // Built-in class
const map = new Map();                // Built-in class
const myObj = new CustomClass();      // Your custom class

// What new returns
class Example {
  value: number = 42;

  constructor() {
    // Constructor implicitly returns 'this'
    // You can explicitly return an object, but it's uncommon
  }
}

const ex = new Example();
console.log(ex.value); // 42
console.log(ex instanceof Example); // true - checks if ex was created by Example
```

## Deep Dive: Properties (Instance vs Static)

### Instance Properties

Instance properties belong to **each individual object** created from the class. Each instance has its own copy of these properties.

```typescript
class BankAccount {
  // Instance properties - each account has its own balance
  accountNumber: string;
  balance: number;
  owner: string;

  constructor(accountNumber: string, owner: string, initialBalance: number = 0) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.owner = owner;
  }

  deposit(amount: number): void {
    this.balance += amount; // Modifies THIS instance's balance
  }
}

const account1 = new BankAccount("001", "Alice", 1000);
const account2 = new BankAccount("002", "Bob", 500);

account1.deposit(200);
console.log(account1.balance); // 1200 - only account1 is affected
console.log(account2.balance); // 500 - account2 is unchanged
```

### Property Initialization

There are multiple ways to initialize properties:

```typescript
class Example {
  // 1. Inline initialization (happens before constructor)
  prop1: string = "default value";

  // 2. Definite assignment (you promise to initialize it)
  prop2!: string; // ! tells TypeScript "I'll initialize this, trust me"

  // 3. Optional property (can be undefined)
  prop3?: number;

  // 4. Initialization in constructor
  prop4: boolean;

  constructor() {
    // prop1 already has "default value"
    this.prop2 = "initialized in constructor";
    // prop3 is undefined (optional)
    this.prop4 = true;
  }
}
```

### Static Properties

Static properties belong to the **class itself**, not to instances. There's only **one copy** shared across all instances.

```typescript
class DatabaseConnection {
  // Static property - shared by all instances
  static connectionCount: number = 0;
  static maxConnections: number = 100;

  // Instance property - unique per instance
  connectionId: string;

  constructor(connectionId: string) {
    this.connectionId = connectionId;

    // Access static property using class name
    DatabaseConnection.connectionCount++;

    if (DatabaseConnection.connectionCount > DatabaseConnection.maxConnections) {
      throw new Error("Too many connections!");
    }
  }

  static getConnectionCount(): number {
    return DatabaseConnection.connectionCount;
  }
}

const conn1 = new DatabaseConnection("conn-1");
const conn2 = new DatabaseConnection("conn-2");
const conn3 = new DatabaseConnection("conn-3");

console.log(DatabaseConnection.connectionCount); // 3
console.log(DatabaseConnection.getConnectionCount()); // 3

// Static members are accessed via the class, not instances
// conn1.connectionCount // ❌ Error
// conn1.getConnectionCount() // ❌ Error
```

### Common Use Cases for Static Members

```typescript
class MathUtils {
  // Static properties: constants
  static readonly PI: number = 3.14159;
  static readonly E: number = 2.71828;

  // Static methods: utility functions that don't need instance data
  static degreesToRadians(degrees: number): number {
    return degrees * (MathUtils.PI / 180);
  }

  static radiansToDegrees(radians: number): number {
    return radians * (180 / MathUtils.PI);
  }

  static max(...numbers: number[]): number {
    return Math.max(...numbers);
  }
}

// Use without creating instances
console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.degreesToRadians(90)); // 1.5708
console.log(MathUtils.max(5, 10, 3, 8)); // 10

// Another example: Factory pattern with static methods
class User {
  constructor(
    public id: string,
    public username: string,
    public role: string
  ) {}

  static createAdmin(username: string): User {
    return new User(crypto.randomUUID(), username, "admin");
  }

  static createGuest(): User {
    return new User(crypto.randomUUID(), "guest", "guest");
  }
}

const admin = User.createAdmin("alice");
const guest = User.createGuest();
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

## Deep Dive: The `this` Keyword

### What is `this`?

The `this` keyword is a special variable that refers to the **current instance** of the class. It's how methods and constructors access the object's own properties and methods.

```typescript
class Person {
  name: string;

  constructor(name: string) {
    // 'this' refers to the new object being created
    this.name = name;
    //   ↑
    //   Without 'this', JavaScript wouldn't know you mean
    //   the property vs the parameter
  }

  greet(): string {
    // 'this' refers to whichever Person object called greet()
    return `Hi, I'm ${this.name}`;
  }
}

const alice = new Person("Alice");
const bob = new Person("Bob");

console.log(alice.greet()); // "Hi, I'm Alice" - this = alice
console.log(bob.greet());   // "Hi, I'm Bob" - this = bob
```

### Why `this` is Necessary

Without `this`, you couldn't distinguish between:
- Local variables/parameters
- Instance properties
- Static properties

```typescript
class Example {
  value: number;

  constructor(value: number) {
    // Both named 'value' - how to tell them apart?
    this.value = value;
    //   ↑         ↑
    //   property  parameter
  }

  setValue(value: number): void {
    // Again, 'this' makes it clear
    this.value = value;
  }

  compareValues(value: number): boolean {
    // Comparing instance property with parameter
    return this.value === value;
  }
}
```

### `this` Context and Method Binding

**Important:** The value of `this` depends on **how a function is called**, not where it's defined.

```typescript
class Counter {
  count: number = 0;

  // Regular method
  increment(): void {
    this.count++;
  }

  // Problem: losing 'this' context
  problematicIncrement(): void {
    setTimeout(function() {
      // ❌ Error: 'this' is undefined or refers to wrong object!
      // this.count++;
    }, 1000);
  }

  // Solution 1: Arrow function (preserves 'this')
  incrementAsync1(): void {
    setTimeout(() => {
      this.count++; // ✅ 'this' refers to Counter instance
    }, 1000);
  }

  // Solution 2: Arrow function method (always bound)
  incrementAsync2 = (): void => {
    setTimeout(() => {
      this.count++; // ✅ Works
    }, 1000);
  }
}

const counter = new Counter();

// Direct call - 'this' works
counter.increment(); // ✅ this = counter

// Extracted method - 'this' might be lost!
const extractedIncrement = counter.increment;
// extractedIncrement(); // ❌ Might fail or behave unexpectedly

// Arrow function method - always safe
const extractedIncrement2 = counter.incrementAsync2;
extractedIncrement2(); // ✅ Still works because arrow functions bind 'this'
```

### Arrow Functions vs Regular Methods

```typescript
class EventHandler {
  message: string = "Hello";

  // Regular method - 'this' can change
  handleClick(): void {
    console.log(this.message);
  }

  // Arrow function property - 'this' is permanently bound
  handleClickArrow = (): void => {
    console.log(this.message);
  }
}

const handler = new EventHandler();

// Simulating event listeners (common source of 'this' issues)
const button = {
  addEventListener: (event: string, callback: () => void) => {
    console.log("Simulating click...");
    callback(); // Called without any object context
  }
};

// Problem with regular method
// button.addEventListener("click", handler.handleClick); // ❌ 'this' will be undefined

// Solution: Arrow function
button.addEventListener("click", handler.handleClickArrow); // ✅ Works!

// Or bind the method
button.addEventListener("click", handler.handleClick.bind(handler)); // ✅ Also works
```

### Accessing Other Methods via `this`

```typescript
class Calculator {
  private result: number = 0;

  add(value: number): this {
    this.result += value;
    return this; // Return 'this' for method chaining
  }

  subtract(value: number): this {
    this.result -= value;
    return this;
  }

  multiply(value: number): this {
    this.result *= value;
    return this;
  }

  getResult(): number {
    return this.result;
  }

  reset(): void {
    this.result = 0;
  }

  // Calling other methods using 'this'
  square(): this {
    this.multiply(this.result); // Access property and call method
    return this;
  }
}

// Method chaining enabled by returning 'this'
const calc = new Calculator();
const result = calc
  .add(10)      // this.result = 10
  .multiply(2)  // this.result = 20
  .subtract(5)  // this.result = 15
  .getResult(); // Returns 15

console.log(result); // 15
```

### `this` in Static Methods

In static methods, `this` refers to the **class itself**, not an instance:

```typescript
class MyClass {
  static count: number = 0;
  static instances: MyClass[] = [];

  constructor() {
    // In constructor, 'this' = instance
    MyClass.count++; // Access static via class name
    MyClass.instances.push(this); // Add instance to static array
  }

  static getCount(): number {
    // In static method, 'this' = the class (MyClass)
    return this.count; // Same as MyClass.count
  }

  static getInstances(): MyClass[] {
    return this.instances; // Same as MyClass.instances
  }

  static resetCount(): void {
    this.count = 0; // Reset static property
    this.instances = []; // Clear instances array
  }
}

new MyClass();
new MyClass();
new MyClass();

console.log(MyClass.getCount()); // 3
console.log(MyClass.getInstances().length); // 3
```

## Deep Dive: Methods (Instance vs Static)

### Instance Methods

Instance methods are functions that operate on individual objects. They have access to `this` and instance properties.

```typescript
class ShoppingCart {
  private items: string[] = [];

  // Instance methods - each cart has its own behavior
  addItem(item: string): void {
    this.items.push(item);
    console.log(`Added ${item} to cart`);
  }

  removeItem(item: string): void {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`Removed ${item} from cart`);
    }
  }

  getItemCount(): number {
    return this.items.length;
  }

  getItems(): string[] {
    return [...this.items]; // Return copy to prevent external modification
  }

  clear(): void {
    this.items = [];
  }

  // Methods can call other methods
  checkout(): void {
    console.log("Checking out with items:", this.getItems());
    this.clear(); // Call another instance method
  }
}

const cart1 = new ShoppingCart();
cart1.addItem("Laptop");
cart1.addItem("Mouse");
console.log(cart1.getItemCount()); // 2

const cart2 = new ShoppingCart();
cart2.addItem("Book");
console.log(cart2.getItemCount()); // 1 - separate from cart1
```

### Static Methods

Static methods belong to the class itself and **cannot** access instance properties or `this` (unless `this` refers to the class).

```typescript
class StringUtils {
  // Static methods - utility functions
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }

  // Static methods can call other static methods
  static capitalizeAndTruncate(str: string, maxLength: number): string {
    const capitalized = this.capitalize(str); // or StringUtils.capitalize(str)
    return this.truncate(capitalized, maxLength);
  }
}

// Use without creating an instance
console.log(StringUtils.capitalize("hello")); // "Hello"
console.log(StringUtils.reverse("hello")); // "olleh"
console.log(StringUtils.truncate("hello world", 8)); // "hello wo..."
console.log(StringUtils.capitalizeAndTruncate("hello world", 8)); // "Hello wo..."
```

### When to Use Static vs Instance Methods

```typescript
// ❌ BAD: Using instance method when static would be better
class BadMathHelper {
  add(a: number, b: number): number {
    return a + b; // Doesn't use 'this' at all!
  }
}
const helper = new BadMathHelper(); // Unnecessary object creation
helper.add(2, 3);

// ✅ GOOD: Use static for utility functions
class GoodMathHelper {
  static add(a: number, b: number): number {
    return a + b;
  }
}
GoodMathHelper.add(2, 3); // No object needed

// ✅ GOOD: Use instance methods when you need instance data
class BankAccount {
  private balance: number = 0;

  // Instance method - needs access to this.balance
  deposit(amount: number): void {
    this.balance += amount;
  }

  // Instance method - needs access to this.balance
  getBalance(): number {
    return this.balance;
  }

  // Static method - doesn't need instance data
  static validateAccountNumber(accountNumber: string): boolean {
    return /^\d{10}$/.test(accountNumber);
  }
}
```

## Keywords Reference Guide

### Quick Reference Table

| Keyword | Purpose | Used In | Example |
|---------|---------|---------|---------|
| `class` | Defines a class (blueprint for objects) | Top-level | `class Person { }` |
| `new` | Creates an instance of a class | Anywhere | `new Person()` |
| `constructor` | Special method for initialization | Inside class | `constructor(name: string) { }` |
| `this` | Refers to current instance (or class in static) | Inside class | `this.name = name` |
| `static` | Makes members belong to class, not instances | Before properties/methods | `static count = 0` |
| `readonly` | Makes properties immutable after initialization | Before properties | `readonly id: string` |
| `public` | Makes members accessible everywhere (default) | Before members | `public name: string` |
| `private` | Makes members accessible only within class | Before members | `private password: string` |
| `protected` | Makes members accessible in class and subclasses | Before members | `protected age: number` |
| `extends` | Creates inheritance relationship | Class declaration | `class Dog extends Animal` |
| `super` | Refers to parent class | Inside subclass | `super()` or `super.method()` |
| `instanceof` | Checks if object is instance of class | Anywhere | `obj instanceof Person` |

### Detailed Keyword Explanations

#### `readonly` Keyword

The `readonly` modifier makes a property immutable after it's been initialized:

```typescript
class User {
  readonly id: string;
  readonly createdAt: Date;
  name: string; // Can be changed

  constructor(id: string, name: string) {
    this.id = id; // ✅ Can set in constructor
    this.createdAt = new Date(); // ✅ Can set in constructor
    this.name = name;
  }

  updateName(newName: string): void {
    this.name = newName; // ✅ OK
    // this.id = "new-id"; // ❌ Error: Cannot assign to 'id' because it is a read-only property
  }
}

const user = new User("user-123", "Alice");
console.log(user.id); // "user-123"
// user.id = "user-456"; // ❌ Error: Cannot assign to 'id'
user.updateName("Alicia"); // ✅ OK

// Common pattern: readonly with inline initialization
class Config {
  readonly MAX_RETRIES: number = 3;
  readonly API_URL: string = "https://api.example.com";
  readonly TIMEOUT: number = 5000;
}
```

#### `instanceof` Operator

The `instanceof` operator checks if an object was created by a specific class (or its subclasses):

```typescript
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  breed: string;
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
}

const animal = new Animal("Generic");
const dog = new Dog("Buddy", "Golden Retriever");
const obj = { name: "Not an animal" };

console.log(animal instanceof Animal); // true
console.log(dog instanceof Dog);       // true
console.log(dog instanceof Animal);    // true - Dog extends Animal
console.log(animal instanceof Dog);    // false
console.log(obj instanceof Animal);    // false

// Useful for type checking and narrowing
function handleAnimal(animal: Animal | Dog) {
  console.log(animal.name);

  if (animal instanceof Dog) {
    // TypeScript knows animal is Dog here
    console.log(animal.breed); // ✅ OK - TypeScript knows Dog has breed
  }
}

handleAnimal(dog);
```

### Combining Keywords

You can combine multiple keywords for powerful effects:

```typescript
class Example {
  // Combining access modifiers with readonly
  public readonly publicConstant: string = "visible everywhere, can't change";
  private readonly privateConstant: string = "only in class, can't change";
  protected readonly protectedConstant: string = "in class & subclasses, can't change";

  // Combining static with readonly (class constant)
  static readonly MAX_INSTANCES: number = 100;
  private static instanceCount: number = 0;

  // Parameter properties can combine modifiers
  constructor(
    public readonly id: string,           // Public and readonly
    private readonly createdAt: Date,     // Private and readonly
    protected name: string                 // Protected
  ) {
    Example.instanceCount++;
    if (Example.instanceCount > Example.MAX_INSTANCES) {
      throw new Error("Too many instances!");
    }
  }

  // Static readonly getter
  static get InstanceCount(): number {
    return this.instanceCount;
  }
}
