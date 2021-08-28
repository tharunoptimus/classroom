const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Class = require("../../schemas/ClassSchema");
const Assignment = require("../../schemas/AssignmentsSchema");
const Test = require("../../schemas/TestsSchema");
const Message = require("../../schemas/MessageSchema");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/:classId/:start/:limit", async (req, res, next) => {

    let start = parseInt(req.params.start)
    let limit = parseInt(req.params.limit)
    let classId = req.params.classId

    await Message.find({classId: classId})
    .sort({createdAt: -1})
    .skip(start)
    .limit(limit)
    .populate("sender")
    .then(results => { res.status(200).send(results)})
    .catch(error => { console.log(error); res.sendStatus(400);})

})


router.post("/", async (req, res, next) => {
    if(!req.body.content || !req.body.classId) {
        console.log("Invalid data passed to the request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.session.user._id,
        content: req.body.content,
        classId: req.body.classId
    }

    if(req.session.user.ownerOf.includes(req.body.classId)) {
        newMessage.isOwner = true;
    }

    await Message.create(newMessage)
    .then( async message => {
        message = await Message.populate(message, {path: "sender", select: ["firstName", "lastName", "profilePic"]})
        res.status(201).send(message);
    })
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    })
    
})


module.exports = router;