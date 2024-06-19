import React, { useContext, useState, useEffect } from "react";
import './CSS/ShopCategory.css';
import Item from '../Components/Item/Item';
import { ShopContext } from "../Components/Context/ShopContext";

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(
            all_product.filter(item =>
                item.category === props.category && 
                item.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            )
        );
    }, [all_product, props.category, searchTerm]);

    return (
        <div className="shop-category">
            <div className="shopcategory-indexsort">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="search-input"
                />
            </div>
            <div className="shopcategory-products">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((item, i) => (
                        <Item 
                            key={i} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            price={item.price} 
                            description={item.description} 
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default ShopCategory;
