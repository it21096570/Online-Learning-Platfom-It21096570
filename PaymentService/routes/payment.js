const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to initiate payment
router.post("/initiate", paymentController.initiatePayment);

module.exports = router;
