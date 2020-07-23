import express from 'express'

import * as noteController from '../controllers/note_controller.js'

const router = express.Router()

router.post('/', noteController.noteCreate)

router.get('/', noteController.noteList)

router.get('/:date(\\d{4}-\\d{2}-\\d{2})', [noteController.parseIsoDate], noteController.noteDetail)

router.put('/:date(\\d{4}-\\d{2}-\\d{2})', [noteController.parseIsoDate], noteController.noteUpdate)

router.delete('/:date(\\d{4}-\\d{2}-\\d{2})', [noteController.parseIsoDate], noteController.noteDelete)

export default router
