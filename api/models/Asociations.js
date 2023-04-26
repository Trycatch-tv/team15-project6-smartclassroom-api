import { Course } from './Courses.js'
import { Grade } from './Grades.js'
import { Registration } from './Registrations.js'
import { Student } from './Students.js'

Course.hasMany(Registration, { foreignKey: 'course_id' });
Registration.belongsTo(Course, { foreignKey: 'course_id' });
Student.hasMany(Registration, { foreignKey: 'student_id' });
Registration.belongsTo(Student, { foreignKey: 'student_id' });
Registration.hasOne(Grade, { foreignKey: 'registration_id' });
Grade.belongsTo(Registration, { foreignKey: 'registration_id' });
