import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Registration = conectionSequelize.define('registrations', {
  registration_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  registration_date: {
    type: DataTypes.DATEONLY(),
    allowNull: true
  },
  cancellation_date: {
    type: DataTypes.DATEONLY(),
    allowNull: true
  }
}, { timestamps: false })
