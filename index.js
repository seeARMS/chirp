/*
 * Main Startup Script for Chirp Wear
 */

// connect to database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const transcribe = require('./transcription')

const API_PORT = 3031
const MONGO_URI = 'mongodb://localhost/chirp'

mongoose.connect(MONGO_URI)
  .catch((err) => {
    console.log('Unable to connect to MongoDB.', err)
  })

// initialize api server
const startAPI = require('./api')
api = startAPI(API_PORT, () => console.log('Listening on ' + API_PORT))

process.on('unhandledRejection', (reason, promise) => {
  console.log('UNHANDLED PROMISE REJECTION')
  console.log(reason)
})

transcribe('./resources/audio.raw')

