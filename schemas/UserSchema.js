const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
    belongsTo: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    ownerOf: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
    tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }]
}, { timestamps: true });

var User = mongoose.model('User', UserSchema)
module.exports = User;