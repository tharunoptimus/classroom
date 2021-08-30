const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Class = require("../../schemas/ClassSchema");
const Assignment = require("../../schemas/AssignmentsSchema");
const Test = require("../../schemas/TestsSchema");
const Message = require("../../schemas/MessageSchema");
const Task = require("../../schemas/TaskSchema");


const { nanoid } = require('nanoid')


app.use(express.urlencoded({extended: true}));
app.use(express.json())


router.post("/create", async (req, res, next) => {

    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let className = req.body.className
    let classId = nanoid(10)
    let lectureLink = createJitsiLink(className, classId)
    let newClass = {
        className: className,
        classId: classId,
        lectureLink: lectureLink
    }


    await Class.create(newClass)
    .then( async (createdClass) => {
        createdClass = await Class.findByIdAndUpdate(createdClass._id, { $addToSet: { owners: req.session.user._id } }, { new: true })
        createdClass = await Class.populate(createdClass, {path: "owners"})
        req.session.user = await User.findByIdAndUpdate(req.session.user._id, {$addToSet: {ownerOf: createdClass._id}})
        res.status(201).send(createdClass)
    })
    .catch(error => { console.log(error); res.sendStatus(400); })
})

router.put("/join", async (req, res, next) => {
    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }

    let classId = req.body.classId
    let userId = req.session.user._id
    
    await Class.findOneAndUpdate({classId: classId}, {$addToSet: {students: userId}}, { new: true})
    .then( async (classToAdd) => {
        req.session.user= await User.findOneAndUpdate({_id: userId}, {$addToSet: {belongsTo: classToAdd._id}}, { new: true})

        classToAdd = await Class.populate(classToAdd, {path: "owners"})
        res.status(201).send(classToAdd)
    })
    .catch(error => { console.log(error); res.sendStatus(400); })
})

router.get("/", async (req, res, next) => {
    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let userId = req.session.user._id

    let resultArray = []
    let idsToSearch = []

    let user = await User.findById(userId)
    user.belongsTo.forEach(element => {
        idsToSearch.push(element._id)
    })
    user.ownerOf.forEach(element => {
        idsToSearch.push(element._id)
    })

    await Class.find({_id: {$in: idsToSearch}})
    .populate("owners")
    .populate("students")
    .then( async (classes) => {
        res.status(200).send(classes)
    })

    
})

function createJitsiLink(className, classID) {
    return "https://meet.jit.si/" + classID + className;
}


module.exports = router;