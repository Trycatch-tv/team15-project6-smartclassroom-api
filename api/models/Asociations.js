import { Course } from './Courses.js'
import { Grade } from './Grades.js'
import { Registration } from './Registrations.js'
import { Student } from './Students.js'

Course.hasMany(Grade, { foreignKey: 'course_id' })

// Una nota pertenece a un curso
Grade.belongsTo(Course, { foreignKey: 'course_id' })

// Un estudiante puede tener muchas notas
Student.hasMany(Grade, { foreignKey: 'student_id' })

// Una nota pertenece a un estudiante
Grade.belongsTo(Student, { foreignKey: 'student_id' })

// Un estudiante puede registrarse en muchos cursos
Student.belongsToMany(Course, {
  through: Registration,
  foreignKey: 'student_id',
  otherKey: 'course_id'
})

// Un curso puede ser registrado por muchos estudiantes
Course.belongsToMany(Student, {
  through: Registration,
  foreignKey: 'course_id',
  otherKey: 'student_id'
})

// Una inscripción pertenece a un estudiante y a un curso
Registration.belongsTo(Student, { foreignKey: 'student_id' })
Registration.belongsTo(Course, { foreignKey: 'course_id' })
