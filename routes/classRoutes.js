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

router.get("/:classId", async (req, res, next) => {

    if(!req.session.user) return res.redirect("/login")

    let checkArray = [...req.session.user.belongsTo, ...req.session.user.ownerOf];
    if(!checkArray.includes(req.params.classId)) return res.redirect("/home")

    var payload = {
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    
    await Class.findById(req.params.classId)
    .then(async classData => {

        if(!classData) return res.redirect("/home")

        classData = await Class.populate(classData, {path: "owners"})

        payload.pageTitle = "Dashboard"
        payload.classObject = classData;
        payload.classObjectJs = JSON.stringify(classData);



        res.status(200).render("stream", payload)
    })
    .catch(err => {
        res.json(err);
        res.status(400).render("/home")
    })
    
})

router.get("/:classId/assignments", async (req, res, next) => {

    if(!req.session.user) return res.redirect("/login")
    let classId = req.params.classId;
    let checkArray = [...req.session.user.belongsTo, ...req.session.user.ownerOf];
    if(!checkArray.includes(req.params.classId)) return res.redirect("/home")

    let owner = req.session.user.ownerOf.includes(classId) ? true : false;

    

    var payload = {
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }
    
    await Class.findById(req.params.classId)
    .then(async classData => {
        classData = await Class.populate(classData, {path: "owners"})

        payload.pageTitle = "Assignments"
        payload.classObject = classData;
        payload.classObjectJs = JSON.stringify(classData);



        res.status(200).render("assignmentview", payload)
    })
    .catch(err => {
        res.json(err);
        res.status(500).send("Server Error")
    })
    
})

router.get("/:classId/tests", async (req, res, next) => {

    if(!req.session.user) return res.redirect("/login")
    let classId = req.params.classId;
    let checkArray = [...req.session.user.belongsTo, ...req.session.user.ownerOf];
    if(!checkArray.includes(req.params.classId)) return res.redirect("/home")

    let owner = req.session.user.ownerOf.includes(classId) ? true : false;

    var payload = {
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    await Class.findById(req.params.classId)
    .then(async classData => {
        classData = await Class.populate(classData, {path: "owners"})

        payload.pageTitle = "Tests"
        payload.classObject = classData;
        payload.classObjectJs = JSON.stringify(classData);

        res.status(200).render("testview", payload)
    })
    .catch(err => {
        res.json(err);
        res.status(500).send("Server Error")
    })

})

router.get("/:classId/people", async (req, res, next) => {

    if(!req.session.user) return res.redirect("/login")
    let classId = req.params.classId;
    let checkArray = [...req.session.user.belongsTo, ...req.session.user.ownerOf];
    if(!checkArray.includes(req.params.classId)) return res.redirect("/home")

    var payload = {
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user)
    }

    await Class.findById(req.params.classId)
    .then(async classData => {
        classData = await Class.populate(classData, {path: "owners"})
        classData = await Class.populate(classData, {path: "students"})

        payload.pageTitle = "People"
        payload.classObject = classData;
        payload.classObjectJs = JSON.stringify(classData);

        res.status(200).render("people", payload)
    })
    .catch(err => {
        res.json(err);
        res.status(500).send("Server Error")
    })

})


module.exports = router; 