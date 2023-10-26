const mongoose = require("mongoose");

const convertSchema = new mongoose.Schema(
  {
    OgImage: {
      type: String,
      required: true,
    },
    extractText: {
      type:String,
      required: false,
    },
  },
  { timestamps: true }
);

const Convert = mongoose.model("Convert", convertSchema);

module.exports = Convert;
