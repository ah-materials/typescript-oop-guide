# Lesson 01 Exercises: Classes and Objects

Complete these exercises to practice creating classes, instantiating objects, and understanding the fundamentals of OOP.

---

## Exercise 1: Simple Class (Easy)

**File:** `01-simple-class-easy.ts`

Create a `Person` class with basic properties:

**Requirements:**
- Properties: `name` (string), `age` (number), `city` (string)
- Constructor that accepts all three properties
- No methods needed for this exercise

**Example usage:**
```typescript
const person1 = new Person("Alice", 30, "New York");
const person2 = new Person("Bob", 25, "Los Angeles");

// Test accessing all properties of person1
console.log(person1.name); // "Alice"
console.log(person1.age);  // 30
console.log(person1.city); // "New York"

// Test accessing all properties of person2
console.log(person2.name); // "Bob"
console.log(person2.age);  // 25
console.log(person2.city); // "Los Angeles"

// Test that objects are independent
person1.age = 31;
console.log(person1.age); // 31
console.log(person2.age); // 25 (unchanged)

// Test with different data
const person3 = new Person("Charlie", 40, "Chicago");
console.log(person3.name); // "Charlie"
console.log(person3.age);  // 40
console.log(person3.city); // "Chicago"
```

**Learning goals:** Basic class syntax, properties, constructors, object instantiation

---

## Exercise 2: Class with Methods (Easy)

**File:** `02-class-with-methods-easy.ts`

Create a `Counter` class with methods to increment and get values:

**Requirements:**
- Property: `count` (number, starts at 0)
- Constructor with no parameters (initializes count to 0)
- Method `increment()`: increases count by 1
- Method `decrement()`: decreases count by 1 (don't go below 0)
- Method `getValue()`: returns the current count
- Method `reset()`: sets count back to 0

**Validation Requirements:**
- `decrement()`:
  - Must not decrease count below 0
  - If count is already 0, calling decrement should keep it at 0
  - No error should be thrown, just maintain minimum value of 0
- Constructor:
  - Always initialize count to exactly 0
- All methods:
  - Count should always be a non-negative integer (>= 0)

**Example usage:**
```typescript
const counter = new Counter();

// Test initial value
console.log(counter.getValue()); // 0

// Test increment
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3

// Test decrement
counter.decrement();
console.log(counter.getValue()); // 2

// Test edge case: decrement multiple times
counter.decrement();
counter.decrement();
console.log(counter.getValue()); // 0

// Test edge case: decrement below zero (should not go below 0)
counter.decrement();
console.log(counter.getValue()); // 0 (should stay at 0)

// Test reset
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2
counter.reset();
console.log(counter.getValue()); // 0

// Test multiple counters are independent
const counter2 = new Counter();
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 3
console.log(counter2.getValue()); // 0 (independent)
```

**Learning goals:** Methods, the `this` keyword, working with object state

---

## Exercise 3: Multiple Objects (Medium)

**File:** `03-multiple-objects-medium.ts`

Create a `BankAccount` class and work with multiple independent instances:

**Requirements:**
- Properties: `accountNumber` (string), `ownerName` (string), `balance` (number)
- Constructor accepts accountNumber, ownerName, and initial balance (default to 0)
- Method `deposit(amount: number)`: adds amount to balance, returns new balance
- Method `withdraw(amount: number)`: subtracts amount if sufficient funds, returns boolean (success/failure)
- Method `getBalance()`: returns current balance
- Method `transfer(amount: number, toAccount: BankAccount)`: transfers money to another account if sufficient funds

**Validation Requirements:**
- `deposit(amount)`:
  - Amount must be positive (> 0)
  - Reject negative or zero amounts
  - Return updated balance only if deposit succeeds
- `withdraw(amount)`:
  - Amount must be positive (> 0)
  - Amount must not exceed current balance
  - Return `true` only if withdrawal succeeds, `false` otherwise
  - Do not modify balance if withdrawal fails
- `transfer(amount, toAccount)`:
  - Amount must be positive (> 0)
  - Amount must not exceed current balance
  - toAccount must be a valid BankAccount object
  - Only modify balances if transfer succeeds
  - If transfer fails, neither account's balance should change
- Constructor:
  - accountNumber must be a non-empty string
  - ownerName must be a non-empty string
  - initialBalance must be >= 0 (no negative starting balances)

**Example usage:**
```typescript
const account1 = new BankAccount("ACC001", "Alice", 1000);
const account2 = new BankAccount("ACC002", "Bob", 500);
const account3 = new BankAccount("ACC003", "Charlie"); // Uses default balance of 0

// Test getBalance
console.log(account1.getBalance()); // 1000
console.log(account3.getBalance()); // 0

// Test deposit
const newBalance1 = account1.deposit(200);
console.log(newBalance1); // 1200
console.log(account1.getBalance()); // 1200

// Test withdraw success
const withdrawSuccess = account1.withdraw(300);
console.log(withdrawSuccess); // true
console.log(account1.getBalance()); // 900

// Test edge case: withdraw with insufficient funds
const withdrawFail = account1.withdraw(1000);
console.log(withdrawFail); // false
console.log(account1.getBalance()); // 900 (unchanged)

// Test edge case: withdraw exact balance
account3.deposit(100);
const withdrawExact = account3.withdraw(100);
console.log(withdrawExact); // true
console.log(account3.getBalance()); // 0

// Test transfer success
account1.transfer(400, account2);
console.log(account1.getBalance()); // 500
console.log(account2.getBalance()); // 900

// Test edge case: transfer with insufficient funds
account1.transfer(600, account2);
console.log(account1.getBalance()); // 500 (unchanged, transfer failed)
console.log(account2.getBalance()); // 900 (unchanged)

// Test edge case: transfer to account with zero balance
account2.transfer(100, account3);
console.log(account2.getBalance()); // 800
console.log(account3.getBalance()); // 100

// Test edge case: negative deposit (should handle appropriately)
// account1.deposit(-50); // Should either throw error or ignore

// Test edge case: negative withdraw (should handle appropriately)
// account1.withdraw(-50); // Should either throw error or ignore
```

**Learning goals:** Multiple object instances, object independence, methods interacting with other objects

---

## Exercise 4: Object Interactions (Medium)

**File:** `04-object-interactions-medium.ts`

Create a `Student` class and a `Course` class that interact with each other:

**Requirements:**

**Student class:**
- Properties: `name` (string), `studentId` (string), `enrolledCourses` (array of course names)
- Constructor accepts name and studentId
- Method `enroll(courseName: string)`: adds course to enrolledCourses
- Method `drop(courseName: string)`: removes course from enrolledCourses
- Method `listCourses()`: returns array of enrolled course names
- Method `isEnrolledIn(courseName: string)`: returns boolean

**Course class:**
- Properties: `courseName` (string), `instructor` (string), `students` (array of Student objects), `maxCapacity` (number)
- Constructor accepts courseName, instructor, and maxCapacity
- Method `addStudent(student: Student)`: adds student if capacity allows, also enrolls student in this course
- Method `removeStudent(student: Student)`: removes student from course
- Method `getEnrollmentCount()`: returns number of enrolled students
- Method `isFull()`: returns boolean

**Example usage:**
```typescript
const student1 = new Student("Alice", "S001");
const student2 = new Student("Bob", "S002");
const student3 = new Student("Charlie", "S003");

const course1 = new Course("TypeScript 101", "Dr. Smith", 2);
const course2 = new Course("JavaScript Basics", "Prof. Johnson", 3);

// Test adding students to course
course1.addStudent(student1);
course1.addStudent(student2);

console.log(course1.getEnrollmentCount()); // 2
console.log(course1.isFull()); // true
console.log(student1.listCourses()); // ["TypeScript 101"]

// Test Student enrollment methods
console.log(student1.isEnrolledIn("TypeScript 101")); // true
console.log(student1.isEnrolledIn("JavaScript Basics")); // false

// Test edge case: adding student to full course
course1.addStudent(student3);
console.log(course1.getEnrollmentCount()); // 2 (should still be 2, add failed)
console.log(student3.listCourses()); // [] (not enrolled in any courses)

// Test student enrolling in multiple courses
course2.addStudent(student1);
course2.addStudent(student2);
console.log(student1.listCourses()); // ["TypeScript 101", "JavaScript Basics"]

// Test removing student from course
course1.removeStudent(student1);
console.log(course1.getEnrollmentCount()); // 1
console.log(course1.isFull()); // false
console.log(student1.listCourses()); // ["JavaScript Basics"]

// Test Student drop method
student2.drop("JavaScript Basics");
console.log(student2.listCourses()); // ["TypeScript 101"]
console.log(course2.getEnrollmentCount()); // 1 (only student1 now)

// Test edge case: dropping a course not enrolled in
student3.drop("TypeScript 101");
console.log(student3.listCourses()); // [] (unchanged, wasn't enrolled)
```

**Learning goals:** Object relationships, bidirectional interactions, managing collections of objects

---

## Exercise 5: Library System (Hard)

**File:** `05-library-system-hard.ts`

Build a comprehensive library management system with multiple interacting classes:

**Requirements:**

**Book class:**
- Properties: `isbn` (string), `title` (string), `author` (string), `isAvailable` (boolean, starts true)
- Constructor accepts isbn, title, author
- Method `checkOut()`: sets isAvailable to false if available, returns boolean (success/failure)
- Method `returnBook()`: sets isAvailable to true
- Method `getInfo()`: returns formatted string with book details

**Member class:**
- Properties: `memberId` (string), `name` (string), `borrowedBooks` (array of Book objects), `maxBooks` (number, default 3)
- Constructor accepts memberId, name, optional maxBooks
- Method `borrowBook(book: Book)`: borrows book if under limit and book is available
- Method `returnBook(book: Book)`: returns a borrowed book
- Method `getBorrowedCount()`: returns number of currently borrowed books
- Method `canBorrow()`: returns boolean (true if under maxBooks limit)
- Method `listBorrowedBooks()`: returns array of borrowed book titles

**Library class:**
- Properties: `name` (string), `books` (array of Book objects), `members` (array of Member objects)
- Constructor accepts name
- Method `addBook(book: Book)`: adds book to library collection
- Method `addMember(member: Member)`: adds member to library
- Method `findBook(isbn: string)`: returns Book or undefined
- Method `findMember(memberId: string)`: returns Member or undefined
- Method `getAvailableBooks()`: returns array of available books
- Method `getTotalBooks()`: returns total number of books
- Method `getMemberCount()`: returns number of registered members

**Validation Requirements:**

**Book class:**
- `checkOut()`:
  - Only succeed if `isAvailable` is `true`
  - Return `false` if book is already checked out
  - Set `isAvailable` to `false` only on success
- Constructor:
  - isbn, title, and author must be non-empty strings

**Member class:**
- `borrowBook(book)`:
  - Check if member can borrow (under `maxBooks` limit)
  - Check if book is available
  - Only add book to `borrowedBooks` if both checks pass
  - Call `book.checkOut()` to update book status
  - Validate that `book` is a valid Book object
- `returnBook(book)`:
  - Check if book is actually in `borrowedBooks` array
  - Only remove if found
  - Call `book.returnBook()` to update book status
- Constructor:
  - memberId and name must be non-empty strings
  - maxBooks must be a positive number (> 0)

**Library class:**
- `findBook(isbn)`:
  - Return `undefined` if no book found
  - Search should be case-sensitive
- `findMember(memberId)`:
  - Return `undefined` if no member found
  - Search should be case-sensitive
- `getAvailableBooks()`:
  - Only return books where `isAvailable === true`
- Constructor:
  - name must be a non-empty string
  - Initialize `books` and `members` as empty arrays

**Example usage:**
```typescript
const library = new Library("City Central Library");

const book1 = new Book("978-0-1", "1984", "George Orwell");
const book2 = new Book("978-0-2", "The Hobbit", "J.R.R. Tolkien");
const book3 = new Book("978-0-3", "Dune", "Frank Herbert");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// Test Library methods
console.log(library.getTotalBooks()); // 3
console.log(library.getAvailableBooks().length); // 3

const member1 = new Member("M001", "Alice");
const member2 = new Member("M002", "Bob", 2);

library.addMember(member1);
library.addMember(member2);

// Test Member count
console.log(library.getMemberCount()); // 2

// Test Book getInfo
console.log(book1.getInfo()); // "1984 by George Orwell (ISBN: 978-0-1) - Available"

// Test borrowing
member1.borrowBook(book1);
member1.borrowBook(book2);

console.log(member1.getBorrowedCount()); // 2
console.log(member1.canBorrow()); // true (under limit of 3)
console.log(member1.listBorrowedBooks()); // ["1984", "The Hobbit"]

// Test Library search methods
const foundBook = library.findBook("978-0-1");
console.log(foundBook?.title); // "1984"

const foundMember = library.findMember("M001");
console.log(foundMember?.name); // "Alice"

// Test edge case: book not found
console.log(library.findBook("invalid-isbn")); // undefined

// Test available books
console.log(library.getAvailableBooks().length); // 1 (only book3)
console.log(book1.isAvailable); // false

// Test returning books
member1.returnBook(book1);
console.log(book1.isAvailable); // true
console.log(book1.getInfo()); // "1984 by George Orwell (ISBN: 978-0-1) - Available"
console.log(library.getAvailableBooks().length); // 2

// Test edge case: trying to borrow unavailable book
const success = book2.checkOut();
console.log(success); // false (already checked out)

// Test edge case: member at borrow limit
member2.borrowBook(book1);
member2.borrowBook(book3);
console.log(member2.canBorrow()); // false (at limit of 2)

// Test edge case: trying to borrow when at limit
const book4 = new Book("978-0-4", "Neuromancer", "William Gibson");
library.addBook(book4);
member2.borrowBook(book4);
console.log(member2.getBorrowedCount()); // 2 (should still be 2, borrow failed)
```

**Learning goals:** Complex object relationships, multi-class systems, real-world application design, managing state across multiple objects

---

## Exercise 6: Parameter Properties (Medium)

**File:** `06-parameter-properties-medium.ts`

Create a `Task` class using parameter property shorthand:

**Requirements:**
- Use parameter properties for: `id` (public number), `title` (public string), `assignedTo` (private string)
- Regular property: `completed` (boolean, starts false)
- Regular property: `createdAt` (Date, initialize in constructor)
- Method `complete()`: Sets completed to true
- Method `isAssignedTo(username: string)`: Returns true if task is assigned to given username
- Method `getStatus()`: Returns string describing task status

**Example usage:**
```typescript
const task1 = new Task(1, "Write documentation", "alice");
const task2 = new Task(2, "Review PR", "bob");

console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Incomplete"

task1.complete();
console.log(task1.getStatus());
// "Task #1: Write documentation - Assigned to alice - Status: Complete"

console.log(task1.isAssignedTo("alice")); // true
console.log(task1.isAssignedTo("bob"));   // false

// Note: task1.assignedTo is private and cannot be accessed directly
```

**Learning goals:** Parameter properties, public vs private, mixing parameter and regular properties

---

## Exercise 7: The `this` Context Problem (Medium)

**File:** `07-this-context-problem-medium.ts`

Create a `Timer` class that demonstrates and solves the `this` context problem:

**Requirements:**
- Property: `seconds` (number, starts at 0)
- Property: `isRunning` (boolean, starts false)
- Regular method `tick()`: increments seconds and logs current time
- Arrow function method `tickArrow`: does the same as tick but preserves `this`
- Method `start()`: sets isRunning to true
- Method `stop()`: sets isRunning to false
- Method `getTime()`: returns current seconds
- Method `reset()`: resets seconds to 0 and stops timer

**Example usage:**
```typescript
const timer = new Timer();

// This works
timer.tick();
console.log(timer.getTime()); // 1

// Extracting method loses 'this' (demonstrates problem)
const tickFn = timer.tick;
// tickFn(); // Would cause error if called

// Arrow function preserves 'this' (solution)
const tickArrowFn = timer.tickArrow;
tickArrowFn();
console.log(timer.getTime()); // 2

// Using bind as another solution
const boundTick = timer.tick.bind(timer);
boundTick();
console.log(timer.getTime()); // 3
```

**Learning goals:** The `this` context problem, arrow functions vs regular methods, `.bind()` method

---

## How to Complete

1. Work through exercises in order (they build in difficulty)
2. Run each exercise with: `npx ts-node exercises/lesson-01/01-simple-class-easy.ts`
3. Test your code thoroughly with different scenarios
4. Make sure all example usage works as expected
5. For exercise 7, experiment with extracting methods and see what breaks

## Tips

- Read the lesson content in `docs/01-classes-and-objects.md` if you get stuck
- Use `console.log()` to verify your code works
- Test edge cases (e.g., withdrawing more than balance, enrolling in full course)
- Focus on understanding the `this` keyword and how objects maintain independent state
- Parameter properties (with access modifiers) save code but are TypeScript-specific
- Arrow functions preserve `this` from where they're defined
- Use `.bind()` when you need to preserve `this` in callbacks
