import body_parser from 'body-parser'
import express from 'express'
import mongodb from 'mongodb'

import add_routes from './app/routes/index.mjs'
import * as config from './config.mjs'

const app = express()

app.use(body_parser.json())

mongodb.MongoClient.connect(config.db_url, (err, database) => {
    if (err) return console.log(err)
    database = database.db('notes-js')

    add_routes(app, { database })

    app.listen(config.port, () => {
        console.log('Live on port ' + config.port)
    })
})
