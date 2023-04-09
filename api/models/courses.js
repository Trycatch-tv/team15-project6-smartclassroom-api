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
    type: DataTypes.STRING(),
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE()
  },
  end_date: {
    type: DataTypes.DATE()
  },
  teacher: {
    type: DataTypes.STRING(),
    allowNull: false
  }
})
