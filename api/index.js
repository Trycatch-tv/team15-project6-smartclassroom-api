import { conectionSequelize } from './databases/db.js'
import app from './app.js'

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
