import mongodb from 'mongodb'

import * as config from '../config.js'
import { Note } from '../models/note.js'

export default function (app, db) {
    app.post('/api/notes', (req, res) => {
        console.log(req.body)

        const note = {
            title: req.body.title,
            content: req.body.content,
        }
        db.collection('notes').insertOne(note, (err, results) => {
            if (err) {
                res.send({ 'error': 'Failed to insert record' })
            } else {
                res.send(results.ops[0])
            }
        })
    })

    /**
     * View returning list of Notes.
     */
    app.get('/api/notes', async (req, res) => {
        // Pull changes to notes
        Note.pull_repo(config.notes_repo_dir)

        const notes = await Note.list(config.notes_dir)
        res.send(notes)
    })

    app.get('/api/notes/:id', (req, res) => {
        const id = req.params.id
        const query = { '_id': new mongodb.ObjectID(id) }

        db.collection('notes').findOne(query, (err, item) => {
            if (err) {
                res.send({ 'error': 'Failed to retrieve record' })
            } else {
                res.send(item)
            }
        })
    })

    app.put('/api/notes/:id', (req, res) => {
        const id = req.params.id
        const query = { '_id': new mongodb.ObjectID(id) }
        const note = {
            title: req.body.title,
            content: req.body.content,
        }

        db.collection('notes').update(query, note, (err, results) => {
            if (err) {
                res.send({ 'error': 'Failed to retrieve record' })
            } else {
                res.send(note)
            }
        })
    })

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id
        const query = { '_id': new mongodb.ObjectID(id) }

        db.collection('notes').removeOne(query, (err, item) => {
            if (err) {
                res.send({ 'error': 'Failed to retrieve record' })
            } else {
                res.send('Note ' + id + ' deleted')
            }
        })
    })
}
