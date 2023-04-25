import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Student = conectionSequelize.define('students', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  student_name: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  national_number_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    indexes: [{
      unique: true,
      fields: ['national_number_id'],
      using: 'BTREE'
    }]
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true
  }
}, { timestamps: false })
