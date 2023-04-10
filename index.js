import { conectionSequelize } from './api/databases/db.js'
import app from './api/app.js'

import './api/models/Asociations.js'
// https://dbdiagram.io/d/6432e3e88615191cfa8c7f1e

const main = async () => {
  try {
    await conectionSequelize.sync({ force: false })
    app.listen(app.get('port'), () => {
      console.log(`🆗✅🆗 Server on port ${app.get('port')} 🆗✅🆗`)
    })
  } catch (err) {
    console.error(`🛑⛔ Not connection database ❗${err}❗ ⛔🛑`)
  }
}

main()