import axios from "axios";
import { useState, useEffect } from "react";
import MainMenu from "../../Components/MainMenu";
import { Button, Icon, Menu, Header, List, Sidebar } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const CreateOrder = () => {
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const orderData = {
    meals: [],
    confirmed: false
  };

  const createOrder = async (orderData) => {
    try {
      const response = await axios.post("/api/FoodOrdering/orders", orderData, { withCredentials: true });
      const createdOrder = response.data;
      setOrderId(createdOrder.id);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateOrder = async () => {
    await createOrder(orderData);
  };

  useEffect(() => {
    if (orderId) {
      // Do something with the orderId, such as navigate to a different page
      console.log("Order ID:", orderId);
    }
  }, [orderId]);


  return (
    <div>
      <MainMenu />
      <h2>double click ¯\_(ツ)_/¯</h2>
      {orderId ? (
        <Button as={NavLink} exact to={`/orders/create/${orderId}`}>
          Make an order
        </Button>
      ) : (
        <Button onClick={handleCreateOrder} disabled={loading}>
          {loading ? 'Creating Order...' : 'Make an order'}
        </Button>
      )}
    </div>
  );
};

export default CreateOrder;
