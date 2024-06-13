import React, { useEffect, useState } from "react";
import './Listproduct.css'
import removeIcon from '../../Assets/remove.png' 

const Listproduct = () => {

    const [allProducts, setAllProducts] = useState([]);
    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => { setAllProducts(data) })
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        await fetchInfo();
    };

    return (
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Name</p>
                <p>Price</p>
                <p>category</p>
                <p>description</p>
                <p>remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product,index)=>{
                    return <><div key={index} className="listproduct-formatmain listproduct-format">
                            <img className="listproduct-product-icon" src={product.image} alt="" />
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <p>{product.category}</p>
                            <p>{product.description}</p>
                            <img onClick={()=>{removeProduct(product.id)}} className="listproduct-remove-icon" src={removeIcon} alt="" />
                    </div>
                    <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default Listproduct