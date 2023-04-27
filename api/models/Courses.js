import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Course = conectionSequelize.define('courses', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_name: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  course_description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  teacher: {
    type: DataTypes.STRING(40),
    allowNull: false
  }
}, { timestamps: false })
