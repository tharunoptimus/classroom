const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    assignmentId: { type: Schema.Types.ObjectId, ref: "Assignment" },
    marksScored: { type: Number, default: 0 }

}, { timestamps: true });

var Task = mongoose.model('Task', TaskSchema)
module.exports = Task;