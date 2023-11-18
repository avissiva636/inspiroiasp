const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./util/middleware/errorHandler");
const {connectDb} = require("./database");
const path = require("path");

const app = express();

port = process.env.PORT || 5000;

// connectDb();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../public/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const publicPath = path.join(__dirname, '..', 'public/js');
console.log(publicPath)
// app.use("public",express.static( publicPath));
// app.use(express.static(publicPath));
app.use(express.static(path.join(__dirname, '../public')));


app.use("/",require("./routes/adminRoutes"));

app.use("/api/home",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server runnig on port ${port}`)
});