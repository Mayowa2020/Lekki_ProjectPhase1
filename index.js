const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require("http-errors");

// Import Routes
const propertiesRouter = require("./src/routes/properties");
const connectDB = require("./src/config/connect");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/properties", propertiesRouter);

// Error handling
app.use(async (req, res, next) => {
    next(createError.NotFound("This router does not exist"));
});

// Error handler

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const port = process.env.PORT || 5000;

const bootstrap = async () => {
    try {
        await connectDB; // connect to Database
        app.listen(port, () => console.log(`Server running on ${port}!`));
    } catch (error) {
        console.log(error);
    }
};

bootstrap();
