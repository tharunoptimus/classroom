const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Class = require("../../schemas/ClassSchema");
const Assignment = require("../../schemas/AssignmentsSchema");
const Test = require("../../schemas/TestsSchema");
const Message = require("../../schemas/MessageSchema");

const { nanoid } = require('nanoid')


app.use(express.urlencoded({extended: true}));
app.use(express.json())


router.post("/create", async (req, res, next) => {

    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let className = req.body.className
    let classId = nanoid(10)
    let owners = [req.session.user._id]
    let lectureLink = createJitsiLink(className, classId)
    let newClass = {
        className: className,
        classId: classId,
        lectureLink: lectureLink,
        owners: owners
    }


    await Class.create(newClass)
    .then( async (createdClass) => {
        createdClass = await Class.populate(createdClass, {path: "owners"})
        res.status(201).send(createdClass)

    })
    .catch(error => { console.log(error); res.sendStatus(400); })
})

router.get("/", async (req, res, next) => {
    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let userId = req.session.user._id
    let classes = await Class.find({owners: userId})
    .populate("owners")
    .populate("students")

    res.status(200).send(classes)
})

function createJitsiLink(className, classID) {
    return "https://meet.jit.si/" + classID + className;
}


module.exports = router;