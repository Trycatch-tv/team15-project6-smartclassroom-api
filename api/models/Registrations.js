import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Registration = conectionSequelize.define('registrations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  registration_date: {
    type: DataTypes.DATE(),
    allowNull: false
  },
  cancellation_date: {
    type: DataTypes.DATE(),
    allowNull: false
  }
})
