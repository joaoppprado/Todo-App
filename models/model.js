//imports
const { error } = require("console");
const fs = require("fs").promises;
const path = require("path");
const { title } = require("process");

//json connection
const dataPath = path.join(__dirname, "..", "data.json");

//Funções read and write
const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, "utf8");
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
};

const writeData = async (data) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing to data.json", error);
        throw error;
    }
};

// Task Object with methods to get and create tasks

const Task = {
    getAll: async () => {
        return await readData();
    },
    create: async (taskData) => {
        const tasks = await readData();
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
            title: taskData.title,
            description: taskData.description || "",
            created: new Date().toLocaleDateString("pt-BR"),
            modified: new Date()
                .toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })
                .replace(/ de /g, ", ")
                .replace(".", ""),
            status: "pending",
            isImportant: taskData.isImportant || false,
        };

        tasks.unshift(newTask);

        await writeData(tasks);
        return newTask;
    },
    edit: async (id, updatedData) => {
        const tasks = await readData();
        const taskId = Number(id);
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        // VALIDAÇÃO: Se a tarefa não for encontrada, taskIndex será -1.
        if (taskIndex === -1) {
            throw new Error(`Task with ID ${id} not found.`);
        }

        const originalTask = tasks[taskIndex];
        const updatedTask = {
            ...originalTask,
            title: updatedData.title || originalTask.title,
            description: updatedData.description || originalTask.description,
            modified: new Date()
                .toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })
                .replace(/ de /g, ", ")
                .replace(".", ""),
        };
        tasks[taskIndex] = updatedTask;
        await writeData(tasks);
        return updatedTask;
    },
    delete: async (id) => {
        const tasks = await readData();
        const taskId = Number(id);
        const updatedTasks = tasks.filter((task) => task.id !== taskId);

        // VALIDAÇÃO: Se o array não diminuiu, a tarefa não foi encontrada.
        if (tasks.length === updatedTasks.length) {
            throw new Error(`Task with ID ${id} not found.`);
        }
        await writeData(updatedTasks);
    },
    updateStatus: async (id) => {
        const tasks = await readData();
        const taskId = Number(id);
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) {
            throw new Error(`Task with ID ${id} not found.`);
        }

        const statusCycle = {
            pending: "in progress",
            "in progress": "concluded",
            concluded: "pending",
        };

        const currentTask = tasks[taskIndex];
        const nextStatus = statusCycle[currentTask.status] || "pending";

        tasks[taskIndex] = {
            ...currentTask,
            status: nextStatus,
            modified: new Date()
                .toLocaleString("pt-BR", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })
                .replace(/ de /g, ", ")
                .replace(".", ""),
        };

        await writeData(tasks);
        return tasks[taskIndex];
    },
};

module.exports = Task;
