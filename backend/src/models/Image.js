const { Schema, model } = require('mongoose');

const imageSchema = Schema(
  {
    image: {
      data: Buffer,
      contentType: String,
    },
    mimetype: String,
  },
  {
    timestamps: true,
  },
);

module.exports = model('Image', imageSchema);
