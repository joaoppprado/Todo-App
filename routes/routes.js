//imports
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/", controller.home);
router.post("/tasks", controller.createTask);
router.patch("/edit/:id", controller.editTask);
router.delete("/delete/:id", controller.deleteTask);
router.patch("/updateStatus/:id", controller.updateStatus);

module.exports = router;
