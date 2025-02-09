// this file have the flow controller function of the uploaded files
//

const Note = require("../models/note");
const { processImage, processAudio } = require("../utils/fileHandlers");
const catchAsync = require("../utils/catchAsync");

const noteController = {
  // create a new note
  async createNote(req, res, next) {
    const { title, content } = req.body;

    if (!title || !content) {
      return next(new AppError("Title and content are required", 400));
    }
    const noteData = {
      title,
      content,
      userID: req.user.id,
    };

    // process the audio file if exists
    if (req.files.audio) {
      noteData.audio = processAudio(req.files.audio[0]);
      noteData.hadAudio = true;
    }

    // process the image files if exists
    if (req.files.images) {
      noteData.images = await Promise.all(req.files.images.map(processImage));
    }

    const note = await Note.create(noteData);

    if (!note) {
      return next(new AppError("Unable to create note", 500));
    }

    res.status(201).json({
      status: "success",
      note: note.toJSON(), // or note.toJSON()
    });
  },

  // get single note by id
  async getNoteById(req, res, next) {
    const note = await Note.findOne({
      _id: req.params.id,
      userID: req.user.id,
    });
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    const audioFile = note.audio ? note.audio.toString("base64") : null;
    const images = note.images
      ? note.images.map((image) => image.toString("base64"))
      : null;
    res.status(200).json({
      status: "success",
      note: {
        ...note.toJSON(),
        audio: audioFile,
        images,
      },
    });
  },

  // get all notes of a user
  async getAllNotes(req, res, next) {
    const notes = await Note.find({ userID: req.user.id }).select(
      "-audio -images",
    );
    if (!notes) {
      return next(new AppError("No notes found", 404));
    }
    res.status(200).json({
      status: "success",
      notes: notes.map((note) => note.toJSON()),
    });
  },

  // update note
  async updateNote(req, res, next) {
    const update = req.body;
    if (!title) {
      return next(new AppError("Title are required", 400));
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userID: req.user.id },
      update,
      { new: true }, // return the updated note
    );

    if (!note) {
      return next(new AppError("Note not found", 404));
    }

    res.status(200).json({
      status: "success",
      note: note.toJSON(),
    });
  },

  // delete note
  async deleteNote(req, res, next) {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userID: req.user.id,
    });
    if (!note) {
      return next(new AppError("Note not found", 404));
    }
    res.status(204).json({
      status: "success",
    });
  },

  // delete all notes of a user
  async deleteAllNotes(req, res, next) {
    await Note.deleteMany({ userID: req.user.id });
    res.status(204).json({
      status: "success",
    });
  },

  // get files audio and images
};
