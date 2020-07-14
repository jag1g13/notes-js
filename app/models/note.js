import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

class Note {
    constructor(title, date, content) {
        this.title = title
        this.date = date
        this.content = content
    }

    /**
     * Read a Note from a Markdown file with YAML frontmatter.
     * 
     * @param {string} filepath - Path of file from which to read a Note
     * @return {Promise<Note>} A Note object
     */
    static async from_file(filepath) {
        const file = await fs.promises.readFile(filepath)
        const parsed = matter(file)
        return new Note(
            path.basename(filepath),
            parsed.data.date,
            parsed.content
        )
    }

    /**
     * Read Notes in Markdown files from a directory.
     * 
     * @param {string} dirpath - Path of directory from which to read Notes
     * @return {Promise<Array<Note>>} Array of Note objects
     */
    static async list(dirpath) {
        const notes_dir = path.resolve(dirpath)

        let files = await fs.promises.readdir(notes_dir)
        files = files.filter(file => path.extname(file) === '.md')

        const notes = files.map(file => {
            const fullpath = path.join(notes_dir, file)
            return Note.from_file(fullpath)
        })

        return Promise.all(notes)
    }
}

export { Note }
