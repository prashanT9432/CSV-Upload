const mongoose = require("mongoose");

const csvSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  uploadedOn: {
    type: Date,
    default: () => Date.now(),
  },
});

const CSV = mongoose.model("CSV", csvSchema);

module.exports = CSV;
