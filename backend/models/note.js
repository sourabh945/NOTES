// this folder is for the models of the app

const mongoose = require("mongoose");

// this is for image
const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
    select: false,
  },
  contentType: {
    type: String,
    required: true,
  },
});

// this is for audio
const audioSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
    select: false,
  },
  contentType: {
    type: String,
    required: true,
  },
});

// this is for note
const noteSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    hadAudio: {
      type: Boolean,
      required: true,
      default: false,
    },
    audio: {
      type: audioSchema,
      required: false,
    },
    images: {
      type: [imageSchema],
      required: false,
      validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
    },
    isArchived: {
      type: Boolean,
      required: true,
      default: false,
    },
    isFavorite: {
      type: Boolean,
      required: true,
      default: false,
    },
    isViewed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.audio;
        delete ret.images;
        return ret;
      },
      virtuals: true, // to include virtual properties like timepstanp and id in the response
    },
    toObject: { virtuals: true }, // to include virtual properties like timepstanp and id in the response
  },
);

function arrayLimit(val) {
  return val.length <= 5;
}

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
