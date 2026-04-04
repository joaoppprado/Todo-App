//imports
const fs = require("fs").promises;
const path = require("path");

//json connection
const dataPath = path.join(__dirname, "..", "data.json");

//Funções read and write
const readData = async () => {
    try {
        const data = await fs.readFile(dataPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
};

const writeData = async (data) => {
    try {
        await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
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
            creation: new Date().toLocaleDateString("pt-BR"),
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
        await writeData(newTask);
        return newTask;
    },
};

module.exports = Task;
