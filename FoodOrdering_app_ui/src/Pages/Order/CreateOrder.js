import axios from "axios";
import MainMenu from "../../Components/MainMenu";
import { Button, Icon, Header, Form, Segment, Table, Select } from "semantic-ui-react";
import { useState, useEffect } from "react";

const CreateOrder = () => {
  const [menus, setMenus] = useState([]);
  const [menuId, setMenuId] = useState("");
  const [menuMeals, setMenuMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("");
  const [orderMeals, setOrderMeals] = useState([]);

  const createOrder = async () => {
    console.log('Order Meals:', orderMeals);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/FoodOrdering/orders',
        {
          meals: orderMeals,
          confirmed: false
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Order created successfully:', response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };


  const fetchMenuMeals = async (selectedMenuId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/FoodOrdering/meal/all/${selectedMenuId}`, {
        withCredentials: true,
      });
      setMenuMeals(response.data);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/FoodOrdering/menu/all", {
          withCredentials: true,
        });
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  useEffect(() => {
    if (menuId) {
      fetchMenuMeals(menuId);
    }
  }, [menuId]);

  const handleAddToOrder = (meal) => {
    const { id, title, description, quantity } = meal;
    const mealToAdd = { title, description, quantity: 1 };
    
    setOrderMeals((prevOrderMeals) => [...prevOrderMeals, mealToAdd]);
  };

  const handleRemoveFromOrder = (meal) => {
    setOrderMeals((prevOrderMeals) => prevOrderMeals.filter((orderMeal) => orderMeal !== meal));
  };

  return (
    <div>
      <MainMenu />

      <Segment id='segment' color='teal'>
        <Form>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Pick a Menu</Table.HeaderCell>
                <Table.HeaderCell>Select dishes</Table.HeaderCell>

              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>

                <Table.Cell collapsing width={5}>
                  <Select
                    options={menus.map((menu) => ({
                      key: menu.id,
                      text: menu.title,
                      value: menu.id,
                    }))}
                    placeholder="Select a menu"
                    value={menuId}
                    onChange={(e, data) => setMenuId(data.value)}
                  />
                </Table.Cell>
                <Table.Cell width={5}>
                  <Select
                    options={menuMeals.map((meal) => ({ 
                      key: meal.id,
                      text: meal.title,
                      value: meal.id,
                    }))}
                    placeholder="Select a meal"
                    value={selectedMeal}
                    onChange={(e, data) => setSelectedMeal(data.value)}
                  />
                  <Button
                    primary
                    disabled={!selectedMeal}
                    onClick={() => {
                      const selectedMealObj = menuMeals.find((meal) => meal.id === selectedMeal);
                      if (selectedMealObj) {
                        handleAddToOrder(selectedMealObj);
                        setSelectedMeal("");
                      }
                    }}
                  >
                    Add to Order
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Header as="h3">Order Meal List:</Header>
          <Table celled>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Meal Name</Table.HeaderCell>
      <Table.HeaderCell collapsing>Quantity</Table.HeaderCell> 
      <Table.HeaderCell collapsing>Actions</Table.HeaderCell> 
    </Table.Row>
  </Table.Header>
  <Table.Body>

    {orderMeals.map((meal, index) => (
  <Table.Row key={index}>
    <Table.Cell>{meal.title}</Table.Cell>
    <Table.Cell>
      <Form.Input
        type="number"
        min={1}
        value={meal.quantity}
        onChange={(e) => {
          const newQuantity = parseInt(e.target.value);
          if (!isNaN(newQuantity)) {
            const updatedOrderMeals = [...orderMeals];
            updatedOrderMeals[index].quantity = newQuantity;
            setOrderMeals(updatedOrderMeals);
          }
        }}
      />
    </Table.Cell>


    <Table.Cell>
      <Button
        id="icocolor"
        basic
        compact
        icon="close icon"
        title="Remove from order"
        style={{ marginLeft: 'auto' }}
        onClick={() => handleRemoveFromOrder(meal)}
      />
    </Table.Cell>
    
  </Table.Row>
))}
  </Table.Body>
</Table>

          <div>
            <Button icon labelPosition="left" className="" href='#/home'><Icon name="arrow left" />Home</Button>
            <Button id='details' type='submit' className="controls" primary onClick={createOrder}>Submit</Button>
          </div>

        </Form>
      </Segment>
    </div>
  );
};

export default CreateOrder;
