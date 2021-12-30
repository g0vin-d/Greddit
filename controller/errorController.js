const sendErrorDev = (err, req, res) => {
    // vegetable market (sab dedo console main)
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        // operational error: ones we handle them
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }

    // unexpted errors
    return res.status(500).json({
        status: "error",
        message: "Something went very wrong!!!!!",
    });
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, req, res);
    } else {
        sendErrorProd(err, req, res);
    }
};
