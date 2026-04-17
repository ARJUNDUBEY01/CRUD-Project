const express = require('express');
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes, getNoteById } = require('../controllers/note.controller');

router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/bulk', bulkCreateNotes);

module.exports = router;
