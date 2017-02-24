/*
 * Api - exposes endpoints for webhooks, client, etc.
 */

// api dependencies
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// routes
const transcriptionRouter = require('./routes/transcription')

// main function to start the API
function startAPI (port, callback) {
  const app = express()

  // add middleware
  app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))
  app.use(bodyParser.json())
  app.use(morgan('combined'))
  app.use(cors())

  // add routes
  app.use('/transcription', transcriptionRouter)

  // listen
  app.listen(port, callback)

  // return app object to be extended
  return app
}

module.exports = startAPI
