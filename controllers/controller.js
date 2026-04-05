// imports
const Task = require("../models/model.js");

//Funções

exports.home = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        const totalTasks = tasks.length;
        // const completedTasks = tasks.filter((task) => task.status === "concluded").length;

        res.render("index", { tasks, totalTasks });
    } catch (error) {
        console.error("Failed to get tasks:", error);
        res.status(500).send("Error getting tasks.");
    }
};

exports.createTask = async (req, res) => {
    try {
        await Task.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.log("Failed to create task:", error);
        res.status(500).send("Error creating task.");
    }
};

exports.editTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.edit(id, req.body);
        res.status(200).json({ message: "Task updated successfuly" });
    } catch (error) {
        console.error("Failed to update task:", error);
        res.status(500).json({ message: "Error updating task" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.delete(id);
        res.sendStatus(204);
    } catch (error) {
        console.error("Failed to delete task:", error);
        res.status(500).json({ message: "Error deleting task" });
    }
};
