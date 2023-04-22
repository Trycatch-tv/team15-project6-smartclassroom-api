import { conectionSequelize } from './api/databases/db.js'
import app from './api/app.js'

const main = async () => {
  try {
    await conectionSequelize.sync({ force: false })
    app.listen(app.get('port'), () => {
      console.log(`Server running on port ${app.get('port')}`)
    })
  } catch (err) {
    console.error(`Error trying to connect to the database: ${err}`)
  }
}

main()
