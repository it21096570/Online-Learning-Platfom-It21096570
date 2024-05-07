const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');


const paymentRoutes = require("./routes/payment");

const corsOptions = {
    origin: 'http://localhost:3000', // Change this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

const app = express();
app.use(cors(corsOptions));
const port = 8081;
const mongoURI = "mongodb+srv://thanuja:fU9UNzunKlAfADxE@cluster0.0ckqiu2.mongodb.net/DS_Microservice_Payment";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected !!!!!!!!!!!");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});


app.use(bodyParser.json()); // Enable JSON request parsing
app.use("/payments", paymentRoutes);

app.listen(port, () => {
    console.log(`Payment Service running on ${port}`);
});

module.exports = mongoose;




