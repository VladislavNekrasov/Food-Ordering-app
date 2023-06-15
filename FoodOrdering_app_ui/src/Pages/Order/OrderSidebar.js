import { useEffect, useState } from "react";
import { Sidebar, Menu, Header, List } from "semantic-ui-react";
import axios from "axios";

const OrderSidebar = ({ orderId, visible, onClose }) => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/FoodOrdering/orders/${orderId}`, { withCredentials: true });
        setOrder(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchOrder();
  }, [orderId]);

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      onHide={onClose}
      vertical
      visible={visible} // Use the visible prop here
      width="wide"
    >
      <Menu.Item as="a" onClick={onClose}>
        Close
      </Menu.Item>
      <Menu.Item>
        <Header as="h4">Order Details</Header>
        {error && <p>Error: {error}</p>}
        {order && (
          <div>
            <p>Order ID: {order.id}</p>
            <p>Confirmed: {order.confirmed.toString()}</p>
            <Header as="h5">Meals:</Header>
            <List divided relaxed>
              {order.meals.map((meal) => (
                <List.Item key={meal.id}>
                  <List.Content>
                    <List.Header>{meal.title}</List.Header>
                    <List.Description>Quantity: {meal.quantity}</List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </div>
        )}
        {!error && !order && <p>Loading...</p>}
      </Menu.Item>
    </Sidebar>
  );
};

export default OrderSidebar;
