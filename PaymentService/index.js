const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const paymentRoutes = require("./routes/payment");


const app = express();
const port = 8081;
const mongoURI = "mongodb+srv://thanuja:fU9UNzunKlAfADxE@cluster0.0ckqiu2.mongodb.net/DS_Microservice_Project_DB";

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




