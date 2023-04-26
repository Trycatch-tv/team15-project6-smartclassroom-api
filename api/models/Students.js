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
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true
  }
}, { 
  timestamps: false,
  indexes: [{
    name: 'national_number_id_index',
    using: 'BTREE',
    fields: ['national_number_id']
  }]
})
