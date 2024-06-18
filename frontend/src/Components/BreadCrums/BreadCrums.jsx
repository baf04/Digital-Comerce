import React, { useContext } from "react";
import './BreadCrums.css'

const BreadCrums = (props) => {

    const {product} = props
    const category = product && product.category;
    const name = product && product.name;
    return (
        <div className="breadcrum">
            Home/Shop/{category}/{name}
        </div>
    )
}

export default BreadCrums
