const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/", (req, res, next) => {

    var payload = {
        pageTitle: "Dashboard",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    }
    res.status(200).render("courses", payload);
})


module.exports = router; 