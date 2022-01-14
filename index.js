const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Import Routes
const propertiesRouter = require("./src/routes/properties");
const connectDB = require("./src/config/connect");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/properties", propertiesRouter);
const bootstrap = async () => {
    try {
        await connectDB; // connect to Database
        app.listen(5000);
    } catch (error) {
        console.log(error);
    }
};

bootstrap();


