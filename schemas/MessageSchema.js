const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessagesSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    sender: { type: String, required: true, ref: "User" },
    content: { type: String, trim: true }

}, { timestamps: true });

var Message = mongoose.model('Message', MessagesSchema)
module.exports = Message;