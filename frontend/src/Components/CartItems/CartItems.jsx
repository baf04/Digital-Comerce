import React, { useContext } from "react";
import './CartItems.css';
import remove_icon from '../Assets/remove.png'; 
import { ShopContext } from "../Context/ShopContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, userPoints, addToHistory } = useContext(ShopContext);

    const handleCheckout = () => {
        const totalAmount = getTotalCartAmount();
        const bonusPoints = Math.floor(totalAmount * 0.1);
        const updatedPoints = userPoints + bonusPoints;

        if (totalAmount === 0) {
            toast.error('Your cart is empty');
            return;
        }

            fetch('http://localhost:4000/updatepoints', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points: updatedPoints }),
        })
        .then((response) => response.json())
        .then((data) => {
            toast.info('Processing Payment', {
                position:"bottom-right"
            });       
            addToHistory();
            setTimeout(() => {
                window.open('https://www.paypal.com');
                window.location.reload();
            }, 2000); 
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            toast.error('There has been an error making this purchase');
        });

    };
    
    const handlePointPurchase = () => {
        const totalAmount = getTotalCartAmount();
        const updatedPoints = userPoints - totalAmount;

        if (totalAmount === 0) {
            toast.error('Your cart is empty');
            return;
        }
        
        if (updatedPoints < 0) {
            toast.error('You dont have enough points to make this purchase');
            return;
        }

        fetch('http://localhost:4000/updatepoints', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ points: updatedPoints }),
        })
        .then((response) => response.json())
        .then((data) => {
            toast.success('Succesfull Purchase', {
                position:"bottom-right"
            });
            addToHistory();
            setTimeout(() => {
                window.location.reload();
            }, 2000); 
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            toast.error('There has been an error making this purchase');
        });
    };
    
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img className="carticon-product-icon" src={e.image} alt={e.name} />
                                <p>{e.name}</p>
                                <p>{e.price}</p>
                                <div className="cartitems-quantity">{cartItems[e.id]}</div>
                                <p>{e.price * cartItems[e.id]}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="Remove item" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <hr />
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                    </div>
                    <div className="cartitems-total-buttons">
                        <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                        <button onClick={handlePointPurchase}>PAY WITH POINTS</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
