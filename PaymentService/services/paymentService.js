const amqplib = require("amqplib");
const Payment = require("../models/Payment");

// Connect to RabbitMQ
async function connectRabbitMQ() {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    await channel.assertQueue("payment_status");
    return channel;
}

// Simulate payment initiation (this would be where you'd integrate with a sandbox payment gateway)
async function initiatePaymentService(payment, email) {
    // Simulate a delay and update payment status to "completed"
    payment.status = "completed";
    await payment.save();

    const channel = await connectRabbitMQ();
    // Publish a message to RabbitMQ indicating that payment was successful
    await channel.sendToQueue("payment_status", Buffer.from(JSON.stringify({
        paymentId: payment._id,
        status: "completed",
        courseId: payment.courseId,
        userId: payment.userId,
        amount: payment.amount,
        email: email
    })));

    return payment;
}

module.exports = { initiatePaymentService };
