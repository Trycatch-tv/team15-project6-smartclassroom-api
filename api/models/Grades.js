import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'
import { Registration } from './Registrations.js'

export const Grade = conectionSequelize.define('grades', {
  grade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  registration_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Registration,
      key: 'registration_id'
    }
  },
  grade1: {
    type: DataTypes.FLOAT(2,2),
    allowNull: false,
    defaultValue: 0
  },
  grade2: {
    type: DataTypes.FLOAT(2,2),
    allowNull: false,
    defaultValue: 0
  },
  grade3: {
    type: DataTypes.FLOAT(2,2),
    allowNull: false,
    defaultValue: 0
  },
  grade4: {
    type: DataTypes.FLOAT(2,2),
    allowNull: false,
    defaultValue: 0
  },
  grade5: {
    type: DataTypes.FLOAT(2,2),
    allowNull: false,
    defaultValue: 0
  }
}, { timestamps: false })

Grade.belongsTo(Registration, { foreignKey: 'registration_id' });