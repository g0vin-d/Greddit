const express = require("express");
const morgan = require("morgan");
const viewRoutes = require("./routes/viewRoutes");

const app = express();

// app logging
if (process.env.NODE_ENV == "development") app.use(morgan("dev"));

//Middlewars
app.use(express.json());

app.get("/", (req, res, next) => {
    res.status(200).json(DB);
});

app.use("/", viewRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
