import React, { useContext } from "react";
import './CSS/PurchaseHistory.css';
import Item from '../Components/Item/Item';
import { ShopContext } from "../Components/Context/ShopContext";

const PurchaseHistory = (props) => {
    const { purchaseHistory } = useContext(ShopContext);

    return (
        <div className="purchase-history">
            <div className="purchasehistory-indexsort">
                <h2>Purchase History</h2>
            </div>
            <div className="purchasehistory-products">
                {purchaseHistory.map((purchase, index) => (
                    <div key={index} className="purchase-history-entry">
                        <h3>Purchase Date: {new Date(purchase.date).toLocaleString()}</h3>
                        <div className="purchase-history-items">
                            {purchase.items.map(item => (
                                <Item
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    price={item.price}
                                    description={`Quantity: ${item.quantity}, Total: ${item.total} Points`}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseHistory;
