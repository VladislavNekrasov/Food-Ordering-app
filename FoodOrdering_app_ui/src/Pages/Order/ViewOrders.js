import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "semantic-ui-react";
import MainMenu from "../../Components/MainMenu";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/FoodOrdering/orders/all`, { withCredentials: true });
      setOrders(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/FoodOrdering/orders/delete/${id}`, {
        withCredentials: true,
      });
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const confirmOrder = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/FoodOrdering/orders/confirm/${id}`, true, { withCredentials: true });
      fetchOrders();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <MainMenu />
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', paddingTop: '40px' }}>
        <Container>
          {orders.length === 0 ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              <p>There are no orders.</p>
            </div>
          ) : (
            <Card.Group itemsPerRow={3}>
              {orders.map((order) => (
                <Card key={order.id}>
                  <Card.Content>
                    <Card.Header>Order: {order.id}</Card.Header>
                    <Card.Description>
                      <p>Meals in order:</p>
                      <ul>
                        {order.meals.map((meal) => (
                          <li key={meal.id}>
                            {meal.title} - Quantity: {meal.quantity}
                          </li>
                        ))}
                      </ul>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    {order.confirmed ? (
                      <Button color="green" disabled>
                        Confirmed
                      </Button>
                    ) : (
                      <Button color="green" onClick={() => confirmOrder(order.id)}>
                        Confirm
                      </Button>
                    )}
                    <Button color="red" onClick={() => cancelOrder(order.id)}>
                      Cancel
                    </Button>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          )}
        </Container>
      </div>
    </div>
  );
};

export default ViewOrders;
