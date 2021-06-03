require('dotenv').config()
const Hapi = require('@hapi/hapi')

const database = require('./src/db')
const SignUpRoute = require('./src/routes/sign-up')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'localhost',
  })

  //routes
  server.route(SignUpRoute)

  await database.connect()
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
