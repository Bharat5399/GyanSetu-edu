const mongoose = require("mongoose")

// One document per course enrollment (paid or free).
// Used for revenue, sales and activity analytics on the dashboards.
const orderSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  amount: { type: Number, default: 0 }, // price paid in rupees (0 for free courses)
  createdAt: { type: Date, default: Date.now },
})

orderSchema.index({ createdAt: 1 })
orderSchema.index({ instructor: 1, createdAt: 1 })

module.exports = mongoose.model("Order", orderSchema)