import React, { useContext, useState } from "react";
import star_icon from '../Assets/Fullstar.png';
import './ProductDisplay.css';
import { ShopContext } from "../Context/ShopContext";
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { styled } from '@mui/system';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, userPoints } = useContext(ShopContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePoints = () => {
        const updatedPoints = userPoints + 20;

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
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            toast.error('There has been an error making this purchase');
        });
    };

    const handleRecommendClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const StyledCopyButton = styled(Button)`
    margin-top: 10px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background: #007fff;
    border: none;
    outline: none;
    cursor: pointer;

    &:hover {
        background: #005ea6;
    }
`;

    const copyToClipboard = () => {
        const productUrl = `http://localhost:3000/product/${product.id}`;
        navigator.clipboard.writeText(productUrl)
            .then(() => {
                toast.success('Link Copied to clipboard');
                handlePoints();
            })
            .catch((err) => {
                toast.error('There has been an error copying to clipboard');
            });
    };

    const open = Boolean(anchorEl);
    const id = open ? 'recommend-popover' : undefined;

    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                    <img src={star_icon} alt="Star" />
                </div>
                <div className="productdisplay-right-price">
                    {product.price} Points
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>
                <button onClick={() => addToCart(product.id)} className="productdisplay-right-button">ADD TO CART</button>
                <button onClick={handleRecommendClick} className="productdisplay-recommend-button">SHARE</button>
                <p className="productdisplay-right-category"><span>Category: </span>{product.category}</p>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div style={{ padding: '20px' }}>
                        <p>Recommend this product to a friend!</p>
                        <p>{product.name}</p>
                        <StyledCopyButton onClick={copyToClipboard}>Copy Link to Clipboard</StyledCopyButton>
                    </div>
                </Popover>
            </div>
        </div>
    );
};

export default ProductDisplay;
