//imports
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/", controller.home);
router.post("/tasks", controller.createTask);
router.delete("/delete/:id", controller.deleteTask);

module.exports = router;
