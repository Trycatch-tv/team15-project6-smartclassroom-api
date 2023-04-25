import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Course = conectionSequelize.define('courses', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_name: {
    type: DataTypes.STRING(),
    allowNull: false,
    unique: true
  },
  course_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY(),
    defaultValue: DataTypes.NOW(),
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY(),
    defaultValue: DataTypes.NOW(),
    allowNull: false
  },
  teacher: {
    type: DataTypes.STRING(),
    allowNull: false
  }
}, { timestamps: false })
