import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Grade = conectionSequelize.define('grades', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  }
})
