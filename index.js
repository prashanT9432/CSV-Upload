const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
require("./config/mongoose");
const PORT = 8080;
const app = express();

app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "mysecretkey",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash());

app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log("Server is listening on port: " + PORT);
});
