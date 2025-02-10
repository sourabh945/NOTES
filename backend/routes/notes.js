// this file contains the routes for the notes
//
const express = require("express");
const {
  createNote,
  getNoteById,
  getAllNotes,
  deleteNote,
  updateNote,
  getArchivedNotes,
} = require("../controller/noteController");
const authenticate = require("../middleware/authenticate");
const upload = require("../middleware/upload"); // multer middleware for file upload
const catchAsync = require("../utils/catchAsync");
const router = express.Router();

router.get("/getnotes", authenticate, getAllNotes); // get all notes

router.post(
  "/createnote",
  authenticate,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  createNote,
); // create a new note

router.get("/getnote/:id", authenticate, getNoteById); // get single note by id

router.delete("/deletenote/:id", authenticate, deleteNote); // delete a note by id

router.put("/modifynote/:id", authenticate, updateNote); // modify a note by id

router.get("/getarchivednotes", authenticate, getArchivedNotes); // get all archived notes

module.exports = router;
