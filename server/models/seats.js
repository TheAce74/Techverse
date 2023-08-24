const mongoose = require("mongoose");

const SeatSchema = mongoose.Schema({
  allocated: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
    default: "Seat",
  },
});

module.exports = mongoose.model("Seat", SeatSchema);
