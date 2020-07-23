import * as config from '../config.js'
import { Note } from '../models/note.js'

/**
 * Router middleware to convert request date param from ISO date string to JS Date object.
 */
function parseIsoDate (req, res, next) {
  console.log(req.params.date)
  req.params.date = new Date(req.params.date)
  console.log(req.params.date)
  next()
}

async function noteCreate (req, res) {
  const note = await new Note({
    title: req.body.title,
    date: req.body.date,
    content: req.body.content,
    metadata: req.body.metadata
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
  const note = await Note.findOne({ date: req.params.date }).exec()

  if (note) {
    res.send(note)
  } else {
    res.send({
      status: 'error',
      message: 'Note not found'
    })
  }
}

async function noteUpdate (req, res) {
  const note = await Note.findOneAndUpdate({
    date: req.params.date
  }, {
    title: req.body.title,
    content: req.body.content,
    metadata: req.params.metadata
  }, {
    new: true
  }).exec()

  res.send(note)
}

async function noteDelete (req, res) {
  const note = await Note.findOneAndDelete({ date: req.params.date }).exec()
  res.send(note)
}

export {
  parseIsoDate,
  noteCreate,
  noteList,
  noteDetail,
  noteUpdate,
  noteDelete
}
