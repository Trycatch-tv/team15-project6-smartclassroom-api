import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Student = conectionSequelize.define('students', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
})
