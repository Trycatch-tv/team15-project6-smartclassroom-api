import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Course = conectionSequelize.define('courses', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true
  },
  description: {
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
})
