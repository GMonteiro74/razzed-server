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
    // password: String,
    location: String,
    established: Number,
    imgUrl: String,
    password: String,
}, {
  timestamps: true
})

const Agency = new model("Agency", agencySchema);

module.exports = Agency;
