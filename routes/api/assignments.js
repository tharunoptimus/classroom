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

function sendErrors(req, res) {

    if(!req.body.classId) { console.log("Class param not sent with request"); return res.sendStatus(400); }
    if(!req.body.name) { console.log("Assignment Title param not sent with request"); return res.sendStatus(400); }
    if(!req.body.description) { console.log("Assignment description param not sent with request"); return res.sendStatus(400); }
    if(!req.body.link) { console.log("Assignment Link param not sent with request"); return res.sendStatus(400); }
    if(!req.body.assignedMarks) { console.log("Assignment Total Marks param not sent with request"); return res.sendStatus(400); }

    return true;
}


router.post("/create", async (req, res, next) => {

    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let isValid = sendErrors(req, res)
    if(isValid) { 

        let data = {
            classId: req.body.classId,
            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            assignedMarks: req.body.assignedMarks
        }

        let assignment = await Assignment.create(data)
        .catch(err => res.status(400).send(err))

        await Class.findByIdAndUpdate(req.body.classId, { $addToSet: { assignments: assignment._id } })
        .catch(err => console.log(err))
        return res.status(201).send(assignment)

    }
    return res.sendStatus(400)
    
})

router.put("/submit", async (req, res, next) => {

    let user = req.session.user;
    let classId = req.body.classId;
    let assignmentId = req.body.assignmentId;


    if(!user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    if(!classId) { console.log("Class param not sent with request"); return res.sendStatus(400); }

    let assignment = await Assignment.findByIdAndUpdate(assignmentId, { $addToSet: { completedBy: user._id } }, { new: true })
    .catch(err => res.status(400).send(err))


    let task = await Task.create({
        userId: user._id,
        assignmentId: assignment._id,
        classId: classId
    })
    .then(async (task) => {
        let foundUser = await User.findByIdAndUpdate(user._id, { $addToSet: { tasks: task._id }, $addToSet: { assignments: assignment._id } }, { new: true })
        .catch(err => res.status(400).send(err))

        req.session.user = foundUser;
        return res.status(201).send(foundUser)
    })
    .catch(err => res.status(400).send(err))   

})

router.get("/:classId/student/incomplete", async (req, res, next) => {
    if(!req.session.user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    let userId = req.session.user._id

    let classId = req.params.classId;

    let selectedClass = await Class.findById(classId)
    .populate({path: "assignments"})
    .catch(err => console.log(err))

    let user = await User.findById(userId)
    .populate({path: "assignments"})
    .catch(err => console.log(err))

    let filteredAssignments = selectedClass.assignments.filter(assignment => {
        return !user.assignments.includes(assignment._id)
    }
    )
    
    return res.status(200).send(filteredAssignments)
    
})

router.get("/:classId/all", async (req, res, next) => {
    let classId = req.params.classId;

    let selectedClass = await Class.findById(classId)
    .populate({path: "assignments"})
    .then(classToReturn => {
        res.status(200).send(classToReturn)
    })
    .catch(err => console.log(err))
    
})

router.get("/:classId/submitted", async (req, res, next) => {
    
    let classId = req.params.classId
    let userId = req.session.user._id

    await Task.find({userId: userId, classId: classId})
    .populate({path: "assignmentId"})
    .then(tasks => {
        res.status(200).send(tasks) 
    })
    .catch(err => {
        console.log(err)
        res.status(400).send(err)
    })
    
})

module.exports = router;
