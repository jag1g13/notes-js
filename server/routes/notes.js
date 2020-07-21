import express from 'express'

import * as noteController from '../controllers/note_controller.js'

const router = express.Router()

router.post('/', noteController.noteCreate)

router.get('/', noteController.noteList)

router.get('/:id', noteController.noteDetail)

router.put('/:id', noteController.noteUpdate)

router.delete('/:id', noteController.noteDelete)

export default router
