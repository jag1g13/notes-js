import path from 'path'

import bodyParser from 'body-parser'
import express from 'express'
import mongodb from 'mongodb'

import notesRouter from './routes/notes.js'
import * as config from './config.js'

const app = express()

app.use(bodyParser.json())
app.use('/api/notes', notesRouter)

if (config.node_env === 'production') {
  // Serve React build dir if running in production mode
  const staticPath = path.resolve('build')
  app.use(express.static(staticPath))

  app.get('/', (req, res) => res.sendFile(path.join(staticPath, 'index.html')))
}

const mongo = mongodb.MongoClient(
  config.db_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

mongo.connect((err, db) => {
  if (err) return console.err(err)
  db = db.db('notes-js')

  const noteCollection = db.collection('notes')
  noteCollection.createIndex({ date: -1 })

  app.listen(config.port, () => {
    console.log('Live on port ' + config.port)
  })
})
