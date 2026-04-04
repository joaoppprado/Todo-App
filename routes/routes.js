//imports
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller.js");

router.get("/", controller.home);
router.post("/tasks", controller.createTask);

module.exports = router;
