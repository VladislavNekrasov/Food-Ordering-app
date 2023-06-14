import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal, Divider, Input, Confirm } from "semantic-ui-react";
import { NavLink, useHref, useParams, Link } from "react-router-dom";
import { EditMeal } from "../Meal/EditMeal";
import AuthService from "../../services/auth.service";
import axios from "axios";
import OrderSidebar from "./OrderSidebar";

export function OrderMealList() {
  const { orderid } = useParams();
  const { menuid } = useParams();

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [menus, setMenus] = useState({
    title: "",
    mealList: [],
  });

  const [meals, setMeals] = useState();

  const [mealTitle, setMealTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const [externalMealList, setExternalMealList] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminFunctions, setShowAdminFunctions] = useState(false);
  const [showUserFunctions, setShowUserFunctions] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Fetch menu
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/FoodOrdering/menu/${menuid}`, {
        withCredentials: true,
      })
      .then((response) => {
        const menusData = response.data;
        setMenus(menusData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [menuid]);

  const addMealToOrder = async (orderId, mealId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/FoodOrdering/orders/${orderId}/meal/${mealId}`,
        {},
        { withCredentials: true }
      );
      setSuccessMessage("Meal added to order successfully!");
    } catch (error) {
      console.log("Error:", error);
      setError("Error adding meal to order.");
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/FoodOrdering/meal/all/${menuid}`,
        {
          withCredentials: true,
        }
      );
      setExternalMealList(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };
  
  const handleOpenSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <MainMenu />
      <OrderSidebar orderId={orderid} visible={sidebarVisible} onClose={handleCloseSidebar} />

      <Grid columns={2}>
        <Grid.Column width={2} id="main"></Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="blue">
            <div>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>
                      Meniu pavadinimas
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>{menus.title}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table celled color="blue">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>Patiekalai</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
                    <Table.HeaderCell>Aprasymas</Table.HeaderCell>
                    <Table.HeaderCell>Kiekis</Table.HeaderCell>
                    <Table.HeaderCell>Veiksmai</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {externalMealList.map((meal) => (
                    <Table.Row key={meal.id}>
                      <Table.Cell>{meal.title}</Table.Cell>
                      <Table.Cell>{meal.description}</Table.Cell>
                      <Table.Cell>{meal.quantity}</Table.Cell>
                      <Table.Cell collapsing>
                        <Button
                          id="icocolor"
                          basic
                          compact
                          icon="plus"
                          onClick={() => addMealToOrder(orderid, meal.id)}
                          title="Add to order"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Divider hidden />
              <Link to={`/orders/create/${orderid}`}>
                <Button icon labelPosition="left" className="">
                  <Icon name="arrow left" />
                  Atgal
                </Button>
              </Link>
              {successMessage && <p>{successMessage}</p>}
              {error && <p>Error: {error}</p>}
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
      <Button onClick={handleOpenSidebar}>Toggle OrderInfo</Button>
    </div>
  );
}
