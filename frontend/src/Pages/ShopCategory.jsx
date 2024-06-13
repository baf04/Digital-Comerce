import React, { useContext } from "react";
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item'
import { ShopContext } from "../Components/Context/ShopContext";

const ShopCategory = (props) => {

    const { all_product } = useContext(ShopContext);

    return (
        <div className="shop-category">
            <div className="shopcategory-indexsort">
            </div>
            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} description={item.description} />
                    }
                    else {
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default ShopCategory
