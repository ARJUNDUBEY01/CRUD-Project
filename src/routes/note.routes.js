const express = require('express');
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes, getNoteById, replaceNote, updateNote } = require('../controllers/note.controller');

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.post('/bulk', bulkCreateNotes);

module.exports = router;
