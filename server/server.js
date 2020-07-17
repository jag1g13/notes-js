import path from 'path'

import body_parser from 'body-parser'
import express from 'express'
import mongodb from 'mongodb'

import add_routes from './routes/index.js'
import * as config from './config.js'

const app = express()

// Serve static files from 'public' directory
const static_path = path.join(path.resolve(), 'public')
console.log(static_path)
app.use(express.static(static_path))

app.use(body_parser.json())

const mongo_client = mongodb.MongoClient(
    config.db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongo_client.connect((err, database) => {
    if (err) return console.log(err)
    database = database.db('notes-js')

    add_routes(app, database)

    app.listen(config.port, () => {
        console.log('Live on port ' + config.port)
    })
})
