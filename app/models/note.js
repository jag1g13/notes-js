import fs from 'fs'

import * as config from '../config.js'

class Note {
    constructor(title, date, content) {
        this.title = title
        this.date = date
        this.content = content
    }

    static async list() {
        const dir = await fs.promises.opendir(config.notes_dir)

        for await (const dirent of dir) {
            console.log(dirent.name)
        }
    }
}

export { Note }
