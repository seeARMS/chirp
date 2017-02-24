const Router = require('express').Router
const multer = require('multer')
const transcribe = require('../../transcription')
const upload = multer({ dest: 'uploads/' })

const transcriptionRouter = Router()

/**
 * GET /api/transcriptions
 *
 * Returns a list of all valid transcriptions that are currently being
 * queried against by the matcher.
 */
transcriptionRouter.get('/', (req, res) => {
  transcription.all()
    .then((transcriptions) => {
      res.json(transcriptions)
    }).catch((err) => {
      res.status(500).json({ success: false})
    })
})

// For updating existing transcriptions
transcriptionRouter.put('/', (req, res) => {
  const transcriptionData = req.body

  transcription.update(transcription._id)
    .then((transcription) => {
      transcription = Object.assign(transcription, transcriptionData)

      return transcription.save()
    })
    .then(() => {
      return res.json({
        success: true
      })
    })
    .catch((err) => {
      log.error(err)
      return res.status(500).json({
        success: false
      })
    })
})

transcriptionRouter.post('/', upload.single('transcription'), (req, res) => {
  const transcriptionMetadata = req.body
  const transcriptionFile = req.file

  return googleCloud.store(transcriptionFile).then((cloudUrl) => {
    return transcribe(cloudUrl)
  }).then((results) => {
    const transcription = results[0]
    const modelData = { transcription: transcription, metadata: transcriptionMetadata }
    return Transcription.create(modelData)
  }).then((transcription) => {
    res.json({ success: true })
  }).catch((e) => {
    console.log(e)

    res.json({ success: false })
  })
})

module.exports = transcriptionRouter
