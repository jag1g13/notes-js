import path from 'path'

import body_parser from 'body-parser'
import express from 'express'
import mongodb from 'mongodb'

import add_routes from './routes/index.js'
import * as config from './config.js'

const app = express()

app.use(body_parser.json())

if (config.node_env === 'production') {
    // Serve React build dir if running in production mode
    const static_path = path.resolve('build')
    app.use(express.static(static_path))

    app.get('/', (req, res) => res.sendFile(path.join(static_path, 'index.html')))
}

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
