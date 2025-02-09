// this file is use for compress the image and audio and do all neccessary perprossing

const sharp = require("sharp");

const catchAsync = require("./catchAsync");

// for image compression
const processImage = catchAsync(async (file) => {
  const processedImage = await sharp(file.buffer)
    .resize(1024, 1024, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 80 })
    .toBuffer();

  return {
    data: processedImage,
    contentType: file.mimetype,
    filename: file.originalname,
  };
});

// for audio processing
const processAudio = (file) => {
  return {
    data: file.buffer,
    contentType: file.mimetype,
    filename: file.originalname,
  };
};

module.exports = { processImage, processAudio };
