const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log("Connection to the Atlas Cluster is successful"))
    .catch((err) => console.log(err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
