import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'
import { Course } from './Courses.js';
import { Student } from './Students.js';

export const Registration = conectionSequelize.define('registrations', {
  registration_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'student_id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'course_id'
    }
  },
  registration_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  cancellation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, { timestamps: false })

Registration.belongsTo(Student, { foreignKey: 'student_id' });
Registration.belongsTo(Course, { foreignKey: 'course_id' });