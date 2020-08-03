import path from 'path'

import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

import notesRouter from './routes/notes.js'
import * as config from './config.js'

const app = express()

app.use(bodyParser.json())
app.use('/api/notes', notesRouter)

if (config.nodeEnv === 'production') {
  // Serve React build dir if running in production mode
  const staticPath = path.resolve('build')
  app.use(express.static(staticPath))

  app.get('/', (req, res) => res.sendFile(path.join(staticPath, 'index.html')))
}

mongoose.connect(config.dbUrl, {
  useCreateIndex: true, // ensureIndex is deprecated - use this instead
  useFindAndModify: false, // Required for findOneAndUpdate
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to database'))

app.listen(config.port, config.address, () => {
  console.log('Live on ' + config.address + ':' + config.port)
})
