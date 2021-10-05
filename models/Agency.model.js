const { Schema, model } = require("mongoose");

const agencySchema = new Schema({
    name: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true,
    },
    location: String,
    established: Number,
    imageUrl: String,
    password: String,
    type: String,
    tours: Array,
}, {
  timestamps: true
})

const Agency = new model("Agency", agencySchema);

module.exports = Agency;
