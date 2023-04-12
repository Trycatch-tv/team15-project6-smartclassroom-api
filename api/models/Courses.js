import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Course = conectionSequelize.define('courses', {
  course_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true
  },
  course_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATEONLY(),
    defaultValue: DataTypes.NOW()
  },
  end_date: {
    type: DataTypes.DATEONLY(),
    defaultValue: DataTypes.NOW()
  },
  teacher: {
    type: DataTypes.STRING(),
    allowNull: false
  }
}, { timestamps: false })
