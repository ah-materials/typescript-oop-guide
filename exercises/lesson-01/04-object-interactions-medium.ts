/**
 * Exercise 4: Object Interactions (Medium)
 *
 * Create two classes:
 * 1. Student - manages student enrollment
 * 2. Course - manages course capacity and students
 *
 * These classes should interact with each other.
 * See README.md for full requirements and example usage.
 */

// Your code here

class Student {
  name: string;
  studentId: string;
  enrolledCourses: string[];

  constructor(name: string, studentId: string) {
    this.name = name;
    this.studentId = studentId;
    this.enrolledCourses = [];
  }

  enroll(courseName: string) {
    if (courseName.length === 0) {
      throw new Error("Course name cannot be empty");
    }
    this.enrolledCourses.push(courseName);
  }

  drop(courseName: string) {
    if (!this.enrolledCourses.includes(courseName)) {
      throw new Error("You can't drop a course you are not enrolled in");
    }

    this.enrolledCourses = this.enrolledCourses.filter(
      (course) => course !== courseName,
    );

    return this.enrolledCourses;
  }

  listCourses() {
    return this.enrolledCourses;
  }

  isEnrolledIn(courseName: string) {
    return this.enrolledCourses.includes(courseName);
  }
}

class Course {
  courseName: string;
  instructor: string;
  students: Student[];
  maxCapacity: number;

  constructor(courseName: string, instructor: string, maxCapacity: number) {
    this.courseName = courseName;
    this.instructor = instructor;
    this.maxCapacity = maxCapacity;
    this.students = [];
  }

  addStudent(student: Student) {
    if (this.students.length < this.maxCapacity) {
      this.students.push(student);
      return student.enroll(this.courseName);
    }
    throw new Error("Course is at full capacity");
  }

  removeStudent(student: Student) {
    if (!student.enrolledCourses.includes(this.courseName)) {
      throw new Error(
        "You can't remove a student who is not enrolled in this course",
      );
    }

    this.students = this.students.filter((s) => s !== student);
    student.drop(this.courseName);
  }

  getEnrollmentCount() {
    return this.students.length;
  }

  isFull() {
    return this.students.length >= this.maxCapacity;
  }
}

const student1 = new Student("Alice", "S001");
const student2 = new Student("Bob", "S002");

const course = new Course("TypeScript 101", "Dr. Smith", 2);

course.addStudent(student1);
course.addStudent(student2);
console.log(course.getEnrollmentCount()); // 2

console.log(course.isFull()); // true
console.log(student1.listCourses()); // ["TypeScript 101"]
