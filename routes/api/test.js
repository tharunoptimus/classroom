const express = require("express");
const app = express();
const router = express.Router();
const User = require("../../schemas/UserSchema");
const Class = require("../../schemas/ClassSchema");
const Assignment = require("../../schemas/AssignmentsSchema");
const Test = require("../../schemas/TestsSchema");
const Message = require("../../schemas/MessageSchema");
const Task = require("../../schemas/TaskSchema");
const TestTask = require("../../schemas/TestsTaskSchema");


app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.put("/return", async (req, res, next) => {

    let user = req.session.user;
    let classId = req.body.classId;
    let assignmentId = req.body.assignmentId;
    let taskId = req.body.taskId;
    let mark = req.body.mark

    if(!user) { console.log("User param not sent with request"); return res.sendStatus(400); }
    if(!classId) { console.log("Class param not sent with request"); return res.sendStatus(400); }

    if(!user.ownerOf.includes(classId)) { console.log("User is not owner of class"); return res.sendStatus(400); }
    console.log(assignmentId)
    let assignment = await Test.findById(assignmentId);
    if(!assignment) { console.log("Assignment not found"); return res.sendStatus(400); }


    await TestTask.findByIdAndUpdate(taskId, { $set: { marksScored: mark } })
    .then(() => res.sendStatus(204))
    .catch(err => { console.log(err); return res.sendStatus(404); });

})

router.get("/:assignmentId", async (req, res, next) => {
    let assignmentId = req.params.assignmentId

    await Test.findById(assignmentId)
    .then(assignment => res.status(200).send(assignment))
    .catch(err => { console.log(err); return res.sendStatus(404); });
})


router.get("/:classId/:assignmentId/returned", async (req, res, next) => {
    
    let classId = req.params.classId
    let assignmentId = req.params.assignmentId
    let userId = req.session.user._id

    await TestTask.find({ assignmentId: assignmentId, classId: classId, marksScored: { $ne: 0 } })
    .populate("userId")
    .then(tasks => res.status(200).send(tasks))
    .catch(err => res.status(400).send(err))
})

router.get("/:classId/:assignmentId/submissions", async (req, res, next) => {
    
    let classId = req.params.classId
    let assignmentId = req.params.assignmentId
    let userId = req.session.user._id

    await TestTask.find({ assignmentId: assignmentId, classId: classId, marksScored: { $eq: 0 } })
    .populate("userId")
    .then(tasks => res.status(200).send(tasks))
    .catch(err => res.status(400).send(err))
})

router.get("/:classId/:assignmentId/all", async (req, res, next) => {
    
    let classId = req.params.classId
    let assignmentId = req.params.assignmentId
    let userId = req.session.user._id

    await TestTask.find({ assignmentId: assignmentId, classId: classId })
    .populate("userId")
    .then(tasks => res.status(200).send(tasks))
    .catch(err => res.status(400).send(err))
})

module.exports = router;