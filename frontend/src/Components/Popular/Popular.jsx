import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import './Popular.css';
import data_mock from '../Assets/mock'
import Item from '../Item/Item';
const Popular = () => {

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:4000/allproducts')
    //         .then(response => {
    //             setProducts(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error obteniendo los productos:', error);
    //         });
    // }, []);

    return (
        <div className="popular">
            <h1>PROMOCIONES FRECUENTEMENTE ELEJIDAS</h1>
            <hr />
            <div className="popular-item">
                {data_mock.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} description={item.description} />
                })}
            </div>
        </div>
    );
}

export default Popular;
