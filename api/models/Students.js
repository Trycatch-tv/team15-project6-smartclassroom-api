import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Student = conectionSequelize.define('students', {
  student_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  student_name: {
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
}, { timestamps: false })
