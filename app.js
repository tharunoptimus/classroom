const express = require("express")
const app = express()
const middleware = require("./middleware")
const port = process.env.PORT || 3003;
const path = require('path')
const mongoose = require("./database")
const session = require("express-session")

const server = app.listen(port, () => console.log("Server Listening on " + port));

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));


app.use(session({
    secret: "bbq chips",
    resave: true,
    saveUninitialized: false
}))

const loginRoutes = require("./routes/loginRoutes")
const registerRoutes = require("./routes/registerRoots")
const classRoutes = require("./routes/classRoutes")
const assignmentRoutes = require("./routes/assignmentRoutes")


// API Endpoints
const classApi = require("./routes/api/class")
const messagesApi = require("./routes/api/messages")
const assignmentsApi = require("./routes/api/assignments")
const assignmentApi = require("./routes/api/assignment")


app.use("/login" , loginRoutes);
app.use("/register" , registerRoutes);
app.use("/class" , classRoutes);
app.use("/assignment" , assignmentRoutes);

// Use API Endpoints

app.use("/api/class" , classApi);
app.use("/api/messages" , messagesApi);
app.use("/api/assignments" , assignmentsApi);
app.use("/api/assignment" , assignmentApi);

app.get("/", middleware.requireLogin, (req, res, next) => {
    var payload = {
        pageTitle: "Classroom",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    }
    res.status(200).render("courses", payload);
})



//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.status(200).render("error");
});