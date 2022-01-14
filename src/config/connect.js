require("dotenv/config");

const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connectDB = mongoose.connection;
connectDB.on("error", (error) => console.error(error));
connectDB.once("open", () => console.log("Connected to Database"));

module.exports = connectDB;
