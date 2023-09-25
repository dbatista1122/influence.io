const express = require('express')
const next = require('next')
require('dotenv').config

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const userApi = require('./server/routes/users')

app.prepare()
.then(() => {
  const server = express()

  server.use('/users', userApi)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})