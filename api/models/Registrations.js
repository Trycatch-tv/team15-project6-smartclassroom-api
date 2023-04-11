import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Registration = conectionSequelize.define('registrations', {
  registration_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  registration_date: {
    type: DataTypes.DATEONLY(),
    allowNull: false
  },
  cancellation_date: {
    type: DataTypes.DATEONLY(),
    allowNull: false
  }
})
