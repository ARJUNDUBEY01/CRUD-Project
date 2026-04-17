const express = require('express');
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes, getNoteById, replaceNote, updateNote, deleteNote, bulkDeleteNotes } = require('../controllers/note.controller');

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', replaceNote);
router.patch('/:id', updateNote);
router.delete('/bulk', bulkDeleteNotes);
router.delete('/:id', deleteNote);
router.post('/bulk', bulkCreateNotes);

module.exports = router;
