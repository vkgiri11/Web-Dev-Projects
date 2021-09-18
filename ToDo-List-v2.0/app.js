const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose
    .connect("mongodb://localhost:27017/todolist")
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

const tasksSchema = new mongoose.Schema({
    name: String,
});

const customTasksSchema = new mongoose.Schema({
    name: String,
    newtasks: [tasksSchema],
});

const Task = mongoose.model("Task", tasksSchema);
const CustomTask = mongoose.model("CustomTask", customTasksSchema);

const task1 = new Task({
    name: "Welcome to your ToDo-List!",
});
const task2 = new Task({
    name: "Hit the + button to add a new task.",
});
const task3 = new Task({
    name: "<-- Hit this to delete a task",
});
const defaultTasks = [task1, task2, task3];

app.get("/", function (req, res) {
    const getDocument = async () => {
        try {
            const result = await Task.find({});

            // Only add default values initially
            if (result.length === 0) {
                const createDefaultDocument = async () => {
                    try {
                        const result = await Task.insertMany(defaultTasks);
                    } catch (err) {
                        console.log(err);
                    }
                };
                createDefaultDocument();
            }

            res.render("list", { type: "Today", newtasks: result });
        } catch (err) {
            console.log(err);
        }
    };

    getDocument();
});

app.get("/:customTaskName", function (req, res) {
    const customTaskname = _.capitalize(req.params.customTaskName);

    const findCustomTask = async () => {
        try {
            const result = await CustomTask.findOne({ name: customTaskname });
            if (!result) {
                const customTaskDefaultDocument = async () => {
                    try {
                        const newtask = new CustomTask({
                            name: customTaskname,
                            newtasks: defaultTasks,
                        });

                        const result = await newtask.save();
                    } catch (err) {
                        console.log(err);
                    }
                };
                customTaskDefaultDocument();
                res.redirect("/" + customTaskname);
            } else {
                res.render("list", { type: result.name, newtasks: result.newtasks });
            }
        } catch (err) {
            console.log(err);
        }
    };
    findCustomTask();
});

app.post("/", function (req, res) {
    let task = req.body.newtask;
    let taskType = req.body.type;

    const newlyAddedTask = new Task({
        name: task,
    });

    if (taskType === "Today") {
        newlyAddedTask.save();
        res.redirect("/");
    } else {
        const findCustomTaskType = async () => {
            try {
                const result = await CustomTask.findOne({ name: taskType });
                result.newtasks.push(newlyAddedTask);
                result.save();
                res.redirect("/" + taskType);
            } catch (err) {
                console.log(err);
            }
        };
        findCustomTaskType();
    }
});

app.post("/delete", function (req, res) {
    const checkedTaskID = req.body.checkboxStatus;
    const checkedTaskType = req.body.taskName;

    if (checkedTaskType === "Today") {
        const deleteDocument = async (_id) => {
            try {
                const result = await Task.deleteOne({ _id });
            } catch (err) {
                console.log(err);
            }
        };
        deleteDocument(checkedTaskID);
        res.redirect("/");
    } else {
        const deleteCustomTaskDocument = async () => {
            try {
                const result = await CustomTask.findOneAndUpdate({ name: checkedTaskType }, { $pull: { newtasks: { _id: checkedTaskID } } });
                res.redirect("/" + checkedTaskType);
            } catch (err) {
                console.log(err);
            }
        };
        deleteCustomTaskDocument();
    }
});

app.listen(3000, function () {
    console.log("Sever Started");
});
