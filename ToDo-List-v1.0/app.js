const express = require("express");
const path = require("path");
const date = require(path.join(__dirname, "date.js"));
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

let tasks = ["Buy Groceries", "Go for a Walk"];
let worktasks = [];

app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", { type: day, newtasks: tasks });
    res.send();
});

app.post("/", function (req, res) {
    let task = req.body.newtask;

    if (req.body.type === "Work List") {
        worktasks.push(task);
        res.redirect("/work");
    } else {
        tasks.push(task);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render("list", { type: "Work List", newtasks: worktasks });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Sever Started");
});
