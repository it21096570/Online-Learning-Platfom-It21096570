import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    // Step 1: Create a list of products
    const products = [
        {
            product_id: '1',
            name: 'Laptop',
            quantity: 2,
            unit_price: 1000, // in dollars
        },
        {
            product_id: '2',
            name: 'Headphones',
            quantity: 10,
            unit_price: 150, // in dollars
        },
        {
            product_id: '3',
            name: 'Smartphone',
            quantity: 5,
            unit_price: 800, // in dollars
        },
    ];

    const user = [
        {
            userId: "66387aa35b38d01194ec5960",
            userEmail: "thanujadha20@gmail.com",
            couseId: "6638f55081d83db6c0daea25",
        }
    ]

    const navigate = useNavigate();

    const handlePayClick = (product) => {
        const totalAmount = product.unit_price * product.quantity;
        navigate('/paymentSummary', {
            state: {
                product_id: product.product_id,
                total_amount: totalAmount,
                product_name: product.name,
                product_quantity: product.quantity,
                user: user
            },
        });
    };

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map((product) => (
                    <div key={product.product_id}>
                        <h2>{product.name}</h2>
                        <p>Quantity: {product.quantity}</p>
                        <p>Unit Price: Rs.{product.unit_price.toFixed(2)}</p>
                        <button onClick={() => handlePayClick(product)}>Pay</button>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;