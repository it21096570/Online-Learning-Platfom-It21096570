const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    paymentId: String,
    userId: String,
    status: String,
    notificationType: {
        type: String,
        enum: ["email", "sms"],
    },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
