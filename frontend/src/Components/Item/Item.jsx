import React from "react";
import './Item.css'
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item">
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt=""></img></Link>
            <p>{props.name}</p>
            <div className="item-prices">{props.price} Points</div>
            <div className="description">{props.description}</div>
        </div>
    )
}

export default Item
