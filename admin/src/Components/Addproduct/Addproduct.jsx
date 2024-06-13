import React, { useState } from "react";
import './Addproduct.css'
import uploadlogo from '../../Assets/upload.png' 

const Addproduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        "name": "",
        "image": "",
        "category": "material",
        "price": 0,
        "description": ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const addProduct = async () => {

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                accept: 'aplication/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => {
            responseData = data;
        });
        if (responseData.succes === true) {
            product.image = responseData.Image_url;


            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    accept: 'aplication/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.success) {
                        alert("Product Added");
                    } else {
                        alert("Failed to add product");
                    }
                });
        }
    };



    return (
        <div className="addproduct">
            <div className="addproduct-itemfield">
                <p>Product Name</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type Here" />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Product Points</p>
                    <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type Here" />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
                    <option value="material">Material</option>
                    <option value="consumible">Consumable</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : uploadlogo} alt="" className="addproduct-thumbnail-image" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <div className="addproduct-itemfield">
                <p>Product Description</p>
                <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type Here" />
            </div>
            <button onClick={() => { addProduct() }} className="addproduct-btn">Add</button>
        </div>
    )
}

export default Addproduct