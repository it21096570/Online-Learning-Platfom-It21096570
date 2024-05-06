const mongoose = require("mongoose");
const express = require("express");
const { startListening } = require("./services/notificationService");

const app = express();
const port = 3001;
const mongoURI = "mongodb+srv://thanuja:fU9UNzunKlAfADxE@cluster0.0ckqiu2.mongodb.net/DS_Microservice_PaymentNotification";

app.get("/", (req, res) => {
  res.send("Payment Notification Service is running.");
});

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected !!!!!!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Start listening to RabbitMQ
startListening();

app.listen(port, () => {
  console.log(`Payment Notification Service running on ${port}`);
});

module.exports = mongoose;






