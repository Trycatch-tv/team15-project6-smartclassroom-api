import { DataTypes } from 'sequelize'
import { conectionSequelize } from '../databases/db.js'

export const Grade = conectionSequelize.define('grades', {
  grade_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  grade1: {
    type: DataTypes.FLOAT(2, 2)
  },
  grade2: {
    type: DataTypes.FLOAT(2, 2)
  },
  grade3: {
    type: DataTypes.FLOAT(2, 2)
  },
  grade4: {
    type: DataTypes.FLOAT(2, 2)
  },
  grade5: {
    type: DataTypes.FLOAT(2, 2)
  }
}, { timestamps: false })
