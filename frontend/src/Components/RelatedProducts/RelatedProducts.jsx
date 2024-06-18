import React, { useContext } from "react";
import './RelatedProducts.css'
import { ShopContext } from "../Context/ShopContext";
import Item from "../Item/Item";

const RelatedProducts = (props) => {

    const { all_product } = useContext(ShopContext);
    const { currentProductId } = props;

    const filteredProducts = all_product.filter(item => item.id !== currentProductId);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const relatedProducts = shuffleArray(filteredProducts).slice(0, 4);

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr />
            <div className="relatedproducts-item">
                {relatedProducts.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} description={item.description} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts;
