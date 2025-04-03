import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Storefront.scss';

const Storefront = () => {
    const [storefrontItems, setStorefrontItems] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:3001/storefront')
            .then((response) => {
                setStorefrontItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching storefront data:', error);
            });
    }, []);

    return (
        <div className="storefront-container">
            <h1>Storefront</h1>
            <div className="item-grid">
                {storefrontItems.map(item => (
                    <div key={item.id} className="item-card">
                        <h3>{item.title}</h3>
                        <p><strong>Category:</strong> {item.category}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Storefront;