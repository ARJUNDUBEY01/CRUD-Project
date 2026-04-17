const Note = require('../models/note.model');

// @desc    Create a single note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  try {
    const { title, content, category, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
        data: {}
      });
    }

    const note = await Note.create({
      title,
      content,
      category,
      isPinned
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: {}
    });
  }
};

// @desc    Create multiple notes
// @route   POST /api/notes/bulk
// @access  Public
const bulkCreateNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes || !Array.isArray(notes) || notes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Notes array is missing or empty",
        data: []
      });
    }

    const createdNotes = await Note.insertMany(notes);

    res.status(201).json({
      success: true,
      message: `${createdNotes.length} notes created successfully`,
      data: createdNotes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      data: []
    });
  }
};

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: []
    });
  }
};

module.exports = {
  createNote,
  bulkCreateNotes,
  getAllNotes
};
