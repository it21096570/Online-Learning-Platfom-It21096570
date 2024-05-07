import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSummary.css';
import { useEffect } from 'react';
import md5 from 'md5';
import axios from "axios";

/* global payhere */ // This tells ESLint that 'payhere' is a global variable

function PaymentSummary() {
    const location = useLocation();
    const { product_id, total_amount, product_name, product_quantity, user } = location.state || {};
    console.log(user[0])

    let merchantId = "1226635"
    let returnUrl = "http://localhost:3000/"
    let cancelUrl = "http://localhost:3000/paymentSummary"
    let notifyUrl = "http://your-notify-url.com"
    let orderId = product_id
    let items = product_name
    let amount = total_amount
    let currency = "LKR"
    let merchantSecret = "MzEzMDM4Nzk1ODQxODk3NTgzNDUzNDgwNzMzODA2MTQzNDU0MjgyOQ=="
    let first_name = 'John'
    let last_name = 'Doe'
    let email = 'john.doe@example.com'
    let phone = '123456789'
    let address = '123 Main St'
    let city = 'Colombo'
    let country = 'Sri Lanka'

    const formattedAmount = Number(amount).toFixed(2);

    const strtoupper = (str) => {
        return str.toUpperCase();
    };

    const baseString = merchantId + orderId + formattedAmount + currency + strtoupper(md5(merchantSecret));
    const generatedHash = strtoupper(md5(baseString));
    console.log("generatedHash : ", generatedHash);

    // Define the payment parameters
    const payment = {
        sandbox: true, // Use 'true' for sandbox/testing, 'false' for production
        merchant_id: merchantId, // Your merchant ID
        return_url: returnUrl, // URL to redirect to after successful payment
        cancel_url: cancelUrl, // URL to redirect to if payment is canceled
        notify_url: notifyUrl, // Server URL for payment notifications
        order_id: orderId, // Order ID
        items: items, // Description of the item(s)
        amount: amount.toFixed(2), // Total amount to be paid
        currency: currency, // Currency code (e.g., 'LKR', 'USD')
        hash: generatedHash,
        first_name: first_name, // Customer first name
        last_name: last_name, // Customer last name
        email: email, // Customer email
        phone: phone, // Customer phone number
        address: address, // Customer address
        city: city, // Customer city
        country: country, // Customer country
    };

    // Function to handle payment click
    const handlePay = () => {
        payhere.startPayment(payment); // Start the PayHere payment popup
    };

    useEffect(() => {
        payhere.onCompleted = async function (orderId) {
            console.log(`Payment completed. Order ID: ${orderId}`);
            // You can add logic for successful payment here
            try {
                const response = await axios.post("http://localhost:8081/payments/initiate", {
                    userId: user[0].userId,
                    courseId: user[0].courseId,
                    amount: parseFloat(amount),
                    userEmail: user[0].userEmail
                });

                console.log(response);

            } catch (error) {
                console.error(error);
            }
        };

        payhere.onDismissed = function () {
            console.log('Payment dismissed');
            // Add logic for payment dismissal (e.g., retry payment)
        };

        payhere.onError = function (error) {
            console.log(`Error occurred: ${error}`);
            // Handle payment errors (e.g., show error message)
        };
    }, []);

    return (
        <div className="payment-summary-page">
            <div className="payment-summary-container">
                <h2 className="payment-summary-title">Payment Summary</h2>

                <div className="payment-details">
                    <div className="payment-detail">
                        <span className="payment-detail-label">Product ID:</span>
                        <span>{product_id}</span>
                    </div>

                    <div className="payment-detail">
                        <span className="payment-detail-label">Product Name:</span>
                        <span>{product_name}</span>
                    </div>

                    <div className="payment-detail">
                        <span className="payment-detail-label">Product Quantity:</span>
                        <span>{product_quantity}</span>
                    </div>

                    <div className="payment-detail">
                        <span className="payment-detail-label">Total Amount:</span>
                        <span>Rs.{total_amount}</span>
                    </div>
                </div>

                <button className="pay-here-button" onClick={handlePay}>
                    Pay with PayHere
                </button>
            </div>
        </div>
    );
}

export default PaymentSummary;
