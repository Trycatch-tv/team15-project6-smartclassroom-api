import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'
import { Student } from './Students.js'
import { Course } from './Courses.js'

export const Grade = conectionSequelize.define('grades', {
  grade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade1: {
    type: DataTypes.FLOAT(2, 2),
    allowNull: false
  },
  grade2: {
    type: DataTypes.FLOAT(2, 2),
    allowNull: false
  },
  grade3: {
    type: DataTypes.FLOAT(2, 2),
    allowNull: false
  },
  grade4: {
    type: DataTypes.FLOAT(2, 2),
    allowNull: false
  },
  grade5: {
    type: DataTypes.FLOAT(2, 2),
    allowNull: false
  }
}, { timestamps: false })

Grade.belongsTo(Student, { foreignKey: 'student_id' })
Grade.belongsTo(Course, { foreignKey: 'course_id' })
