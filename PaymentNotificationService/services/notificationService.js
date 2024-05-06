const amqplib = require("amqplib");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const Notification = require("../models/Notification");

// RabbitMQ configuration
const RABBITMQ_URL = "amqp://localhost";
const QUEUE_NAME = "payment_status";

// Nodemailer configuration
const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'divlinkapp@gmail.com',
        pass: 'nybz nunm lzyy ljwy'
    },
});

// Twilio configuration
const twilioClient = twilio("", ""); // Replace with your Twilio credentials

// Function to process RabbitMQ messages
async function processMessage(msg) {
    const content = JSON.parse(msg.content.toString());

    // Determine the notification type based on payment status
    let notificationType = "email"; // Default to email
    let message = "";

    if (content.status === "completed") {
        message = `Payment successful for course ${content.courseId}.`;
    } else if (content.status === "failed") {
        message = `Payment failed for course ${content.courseId}.`;
    }

    // Create a notification record in MongoDB
    const notification = new Notification({
        paymentId: content.paymentId,
        userId: content.userId,
        status: content.status,
        notificationType,
        message,
    });

    await notification.save();

    // Send email notification
    if (notificationType === "email") {
        try {
            let info = await emailTransporter.sendMail({
                from: "divlinkapp@gmail.com", // Update with your email
                to: "thanujadha20@gmail.com", // Update with the user's email
                subject: "Payment Notification",
                text: message,
            });
            console.log('Email sent');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    // Send SMS notification
    if (notificationType === "sms") {
        await twilioClient.messages.create({
            body: message,
            from: "+14015371280", // Update with your Twilio phone number
            to: "+750561541", // Update with the user's phone number
        });
    }
}

// Function to connect to RabbitMQ and start consuming messages
async function startListening() {
    const connection = await amqplib.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME);

    console.log("Listening for messages...");

    channel.consume(QUEUE_NAME, async (msg) => {
        await processMessage(msg);
        channel.ack(msg); // Acknowledge the message
    });
}

module.exports = { startListening };
