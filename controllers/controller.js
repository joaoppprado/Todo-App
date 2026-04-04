// imports
const Task = require("../models/model.js");

//Funções

exports.home = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((tasks) => tasks.status === "concluded").length;

        res.render("index", { tasks, totalTasks, completedTasks });
    } catch (error) {
        console.error("Failed to get tasks:", error);
        res.status(500).send("Error getting tasks.");
    }
};
