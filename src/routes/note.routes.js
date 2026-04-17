const express = require('express');
const router = express.Router();
const { createNote, bulkCreateNotes, getAllNotes } = require('../controllers/note.controller');

router.post('/', createNote);
router.get('/', getAllNotes);
router.post('/bulk', bulkCreateNotes);

module.exports = router;
