const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	firstName: { type: String, required: true, trim: true },
	lastName: { type: String, required: true, trim: true },
	username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
    coverPhoto: { type: String},
    personalEmail: { type: String, trim: true },
    phone: { type: String, trim: true },
    personalURL: { type: String, trim: true },
    aboutField: { type: String, trim: true, default: "Hi There! Thunder Me!" },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    retweets: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    
}, { timestamps: true });

var User = mongoose.model('User', UserSchema)
module.exports = User;