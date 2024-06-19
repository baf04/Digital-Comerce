import React, { useEffect, useState } from 'react';
import './Popular.css';
import data_mock from '../Assets/mock'
import Item from '../Item/Item';
const Popular = () => {

    return (
        <div className="popular">
            <h1>FRECUENTLY CHOSEN PROMOTIONS</h1>
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
