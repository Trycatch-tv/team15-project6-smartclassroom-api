import { Course } from './Courses.js'
import { Grade } from './Grades.js'
import { Registration } from './Registrations.js'
import { Student } from './Students.js'

// note: 1-m
Course.hasMany(Registration, {
  foreignKey: 'courseId',
  sourceKey: 'id'
})

Registration.belongsTo(Course, {
  foreignKey: 'courseId',
  targetKey: 'id'
})

// note: 1-m
Student.hasMany(Registration, {
  foreignKey: 'studenId',
  sourceKey: 'id'
})

Grade.belongsTo(Student, {
  foreignKey: 'studenId',
  targetKey: 'id'
})

// note: 1-m
Course.hasMany(Grade, {
  foreignKey: 'courseId',
  sourceKey: 'id'
})

Grade.belongsTo(Course, {
  foreignKey: 'courseId',
  targetKey: 'id'
})

// note: 1-m
Student.hasMany(Registration, {
  foreignKey: 'studenId',
  sourceKey: 'id'
})

Registration.belongsTo(Course, {
  foreignKey: 'studenId',
  targetKey: 'id'
})
