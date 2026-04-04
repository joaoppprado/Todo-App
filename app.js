//Import
const express = require("express");
const path = require("path");
const route = require("./routes/routes");
//config
const app = express();
const PORT = 2789;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", route);
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
