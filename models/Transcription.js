/*
 * Transcription Model
 *
  * Contains the transcription text, and all associated
  * metadata
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transcriptionSchema = new Schema({
  transcription: {
    type: String,
    required: true
  },
  metadata: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Transcription', transcriptionSchema)
