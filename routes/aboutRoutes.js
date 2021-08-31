const express = require("express");
const app = express();
const router = express.Router();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

router.get("/", async (req, res, next) => {
    res.status(200).render("info")
})

module.exports = router; 