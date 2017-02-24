const Speech = require('@google-cloud/speech')

// Your Google Cloud Platform project ID
const projectId = '1034457754834'

// Instantiates a client
const speechClient = Speech({
  projectId: projectId
})

// The audio file's encoding and sample rate
const options = {
  encoding: 'LINEAR16',
  sampleRate: 16000
}

function transcribe (fileName) {
  // Detects speech in the audio file
  speechClient.recognize(fileName, options)
    .then((results) => {
      const transcription = results[0]
      console.log(`Transcription: ${transcription}`)
    })
}

module.exports = transcribe
