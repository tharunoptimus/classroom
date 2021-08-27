const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AssignmentsSchema = new Schema({
    classId: { type: Schema.Types.ObjectId, ref: "Class" },
    name: { type: String, required: true },
    description: { type: String, trim: true },
    link: { type: String, required: true },
    assignedMarks: { type: Number, required: true },
    marksScored: { type: Number },
    completedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date, required: true, trim: true },

}, { timestamps: true });

var Assignment = mongoose.model('Assignment', AssignmentsSchema)
module.exports = Assignment;