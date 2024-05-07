import React from 'react';
import { useEffect } from 'react';
import md5 from 'md5';
import { useLocation } from 'react-router-dom';
import axios from "axios";


/* global payhere */ // This tells ESLint that 'payhere' is a global variable


const PayHerePayment = () => {

    const location = useLocation();
    const { product_id, total_amount } = location.state || {};

    let merchantId = "1226635"
    let returnUrl = "http://your-return-url.com"
    let cancelUrl = "http://your-cancel-url.com"
    let notifyUrl = "http://your-notify-url.com"
    let orderId = product_id
    let items = "Test Item"
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
        return_url: 'http://localhost:3000/', // URL to redirect to after successful payment
        cancel_url: 'http://localhost:3000/', // URL to redirect to if payment is canceled
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
    const handlePaymentClick = () => {
        payhere.startPayment(payment); // Start the PayHere payment popup
    };

    useEffect(() => {
        payhere.onCompleted = async function (orderId) {
            console.log(`Payment completed. Order ID: ${orderId}`);
            // You can add logic for successful payment here
            try {
                const response = await axios.post("http://localhost:8081/payments/initiate", {
                    userId: "user0012",
                    courseId: orderId,
                    amount: parseFloat(amount),
                });
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
        <div>
            <button onClick={handlePaymentClick}>Pay with PayHere</button>
        </div>
    );
};

export default PayHerePayment;
