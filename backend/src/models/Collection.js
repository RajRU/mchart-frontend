const { Schema, model } = require('mongoose');
// const { PACKAGE } = require('./Enum');

const Collection = new Schema(
  {
    publicAddress: {
      type: String,
      lowercase: true,
    },
    collectionAddress: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true },
);

module.exports = model('Collection', Collection);
