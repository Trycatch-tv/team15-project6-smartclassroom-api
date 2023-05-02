import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'
// import { Registration } from './Registrations.js'

export const Student = conectionSequelize.define('students', {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  student_name: {
    type: DataTypes.STRING(40),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 40]
    }
  },
  national_number_id: {
    type: DataTypes.BIGINT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true
    }
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      len: [1, 10]
    }
  }
}, {
  timestamps: false,
  indexes: [{
    name: 'national_number_id_index',
    using: 'BTREE',
    fields: ['national_number_id']
  }]
})

// Student.hasMany(Registration, { foreignKey: 'student_id' })
