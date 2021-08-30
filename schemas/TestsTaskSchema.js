const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TestTaskSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    assignmentId: { type: Schema.Types.ObjectId, ref: "Test" },
    marksScored: { type: Number, default: 0 }

}, { timestamps: true });

var TestTask = mongoose.model('TestTask', TestTaskSchema)
module.exports = TestTask;