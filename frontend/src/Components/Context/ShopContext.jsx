import React, { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 1200 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);
    const [userPoints, setUserPoints] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        toast.success('Product Added to Cart', {
            position:"bottom-right"
        });

    };

    const addToHistory = async () => {
        const purchasedItems = Object.entries(cartItems)
            .filter(([itemId, quantity]) => quantity > 0)
            .map(([itemId, quantity]) => {
                const itemInfo = all_product.find(product => product.id === parseInt(itemId));
                return {
                    id: itemId,
                    name: itemInfo.name,
                    image: itemInfo.image,  
                    quantity,
                    price: itemInfo.price,
                    total: itemInfo.price * quantity,
                };
            });
    
        const newPurchase = {
            date: new Date().toISOString(),
            items: purchasedItems,
        };
    
        try {
            const response = await fetch('http://localhost:4000/addtohistory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                },
                body: JSON.stringify({ history: newPurchase }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                toast.success('Purchase history updated', { position: "bottom-right" });
                setPurchaseHistory(prev => [...prev, newPurchase]);
                setCartItems(getDefaultCart());
            } else {
                toast.error('Failed to update purchase history', { position: "bottom-right" });
            }
        } catch (error) {
            console.error('Error updating purchase history:', error);
            toast.error('Error updating purchase history', { position: "bottom-right" });
        }
    };
    
    
    
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const changeUserPoints = (points) => {
        fetch('http://localhost:4000/allproducts', {
            method: 'POST',
            headers: {
                'Accept': 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points: points }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    };
    
    
    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === parseInt(item));
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.warn(`Product with id ${item} not found in all_product`);
                }
            }
        }
        return totalAmount;
    };
    

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => {
                setAll_product(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getpoints', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) 
            })
            .then((response) => response.json())
            .then((data) => {
                setUserPoints(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        }

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getusername', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) 
            })
            .then((response) => response.json())
            .then((data) => {
                setUsername(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        }
        
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/gethistory', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}) 
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setPurchaseHistory(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
        }
    }, []);
    

    const contextValue = {
        all_product,
        cartItems,
        username,
        addToCart,
        removeFromCart,
        loading,
        getTotalCartAmount,
        getTotalCartItems,
        userPoints,
        changeUserPoints,
        addToHistory,
        purchaseHistory,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {loading ? (
                <div>Loading...</div>
            ) : all_product.length > 0 ? (
                props.children
            ) : (
                <div>There are no Products Available Right now</div>
            )}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
