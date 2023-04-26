import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Registration = conectionSequelize.define('registrations', {
  registration_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cancellation_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, { timestamps: false })
