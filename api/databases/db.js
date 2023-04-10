import { Sequelize } from 'sequelize'
import env from '../config.js'

export const conectionSequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PWD, {
  host: env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})
