const express = require('express');
const router = express.Router();
const { createNote, bulkCreateNotes } = require('../controllers/note.controller');

router.post('/', createNote);
router.post('/bulk', bulkCreateNotes);

module.exports = router;
