import childProcess from 'child_process'
import fs from 'fs'
import path from 'path'
import util from 'util'

import matter from 'gray-matter'
import mongoose from 'mongoose'

import * as config from '../config.js'

const exec = util.promisify(childProcess.exec)

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  date: { type: Date, required: true, index: true, unique: true },
  content: { type: String, required: true },
  metadata: { type: Object }
})

class NoteClass {
  /**
   * Read a Note from a Markdown file with YAML frontmatter.
   *
   * @param {string} filepath - Path of file from which to read a Note
   * @returns {Promise<Note>} A Note object
   */
  static async fromFile (filepath) {
    const file = await fs.promises.readFile(filepath)
    const parsed = matter(file)

    const data = {
      title: path.basename(filepath),
      date: parsed.data.date,
      content: parsed.content,
      metadata: parsed.data
    }

    const options = {
      new: true,
      upsert: true
    }

    return Note.findOneAndUpdate({ date: parsed.data.date }, data, options)
  }

  /**
   * Pull changes from upstream to a git repository.
   *
   * @param {string} dirpath - Path of directory containing git repository to update
   */
  static async pullRepo (dirpath) {
    const options = {
      cwd: dirpath,
      env: { ...process.env }
    }
    if (config.git_ssh_keyfile) {
      options.env['GIT_SSH_COMMAND'] = `ssh -i ${config.git_ssh_keyfile} -o IdentitiesOnly=yes` // eslint-disable-line dot-notation
    }

    console.log('Pulling changes to notes repo')

    try {
      const git = await exec('git pull --ff-only', options)
      console.log(git.stdout || git.stderr)
    } catch (exc) {
      console.error(exc)
    }
  }

  /**
   * Read Notes in Markdown files from a directory.
   *
   * @param {string} dirpath - Path of directory from which to read Notes
   * @returns {Promise<Array<Note>>} Array of Note objects
   */
  static async loadFromDir (dirpath) {
    const notesDir = path.resolve(dirpath)

    let files = await fs.promises.readdir(notesDir)
    files = files.filter(file => path.extname(file) === '.md').reverse()

    const notes = files.map(file => {
      const fullpath = path.join(notesDir, file)
      return Note.fromFile(fullpath)
    })

    return Promise.all(notes)
  }
}

// Populate schema from ES6 class
NoteSchema.loadClass(NoteClass)
const Note = mongoose.model('Note', NoteSchema)

export { Note }
