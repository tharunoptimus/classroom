const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");


app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.set("view engine", "pug");
app.set("views", "views");

router.get("/", (req, res, next) => {
    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword) {
        var user = await User.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            
            payload.errorMessage = "Something went wrong!"
            return res.status(200).render("login", payload);
        })

        if(user != null) {
            var result = await bcrypt.compare(req.body.logPassword, user.password);

            if(result === true) {
                req.session.user = user;
                return res.redirect("/");
            }
        }
        payload.errorMessage = "Login Credentials Incorrect!"
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure to enter all the details!"
    res.status(200).render("login", payload);
})

module.exports = router;