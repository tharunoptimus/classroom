const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");
const Class = require("../schemas/ClassSchema");
const Assignment = require("../schemas/AssignmentsSchema");
const Test = require("../schemas/TestsSchema");
const Message = require("../schemas/MessageSchema");
const Task = require("../schemas/TaskSchema");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/:classId/:assignmentId", async (req, res, next) => {

    if(!req.session.user) return res.redirect("/login")

    let checkArray = [...req.session.user.belongsTo, ...req.session.user.ownerOf];
    if(!checkArray.includes(req.params.classId)) return res.redirect("/home")

    var payload = {
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    
    await Class.findById(req.params.classId)
    .then(async classData => {
        classData = await Class.populate(classData, {path: "owners"})

        payload.pageTitle = "Assignment"
        payload.classObject = classData;
        payload.classObjectJs = JSON.stringify(classData)

        await Assignment.findById(req.params.assignmentId)
        .then(async assignmentData => {
            payload.assignmentObject = assignmentData;
            payload.assignmentObjectJs = JSON.stringify(assignmentData)

            res.render("assignment", payload)
        })
        .catch(err => console.log(err))



    })
    .catch(err => {
        res.json(err);
        res.status(500).send("Server Error")
    })
    
})


module.exports = router; 