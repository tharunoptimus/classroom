const express = require("express");
const app = express();
const router = express.Router();
const User = require("../schemas/UserSchema");

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/", async (req, res, next) => {
    if(!req.session.user) return res.redirect("/login")

    let user = await User.findById(req.session.user._id)
    .populate("belongsTo")
    .then(user => {
        var payload = {
            pageTitle: "Calendar",
            userLoggedIn: user,
            userLoggedInJs: JSON.stringify(user)
        }
        res.status(200).render("calendar", payload);
    })
    .catch(err => res.redirect("/"))

    
})

module.exports = router; 