import * as config from '../config.js'
import { Note } from '../models/note.js'

async function noteCreate (req, res) {
  const note = await new Note({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    metadata: req.body.metadata || undefined
  }).save()

  res.send(note)
}

/**
 * View returning list of Notes.
 *
 * Update notes repo then read notes.
 */
async function noteList (req, res) {
  await Note.pullRepo(config.notesRepoDir)
    .then(output => console.log(output))
    .catch(err => console.error(err))

  const notes = await Note.list(config.notesDir)
  res.send(notes)
}

async function noteDetail (req, res) {
  const note = await Note.findById(req.params.id).exec()
  res.send(note)
}

async function noteUpdate (req, res) {
  const note = await Note.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  }, {
    new: true
  }).exec()

  res.send(note)
}

async function noteDelete (req, res) {
  const note = await Note.findByIdAndDelete(req.params.id).exec()
  res.send(note)
}

export {
  noteCreate,
  noteList,
  noteDetail,
  noteUpdate,
  noteDelete
}
