const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ClassSchema = new Schema({
    className: { type: String, required: true, trim: true },
    classId: { type: String, required: true },
    lectureLink: { type: String, required: true },
    owners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    timings: { type: String },
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
    tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }]

}, { timestamps: true });

var Class = mongoose.model('Class', ClassSchema)
module.exports = Class;