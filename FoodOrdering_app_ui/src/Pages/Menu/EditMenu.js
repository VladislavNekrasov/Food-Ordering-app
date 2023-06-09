import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Grid, Form, Button, Icon, Segment, Table, Modal, Divider, Input, Confirm } from "semantic-ui-react";
import { NavLink, useHref, useParams, Link } from "react-router-dom";
import { EditMeal } from "../Meal/EditMeal";
import AuthService from "../../services/auth.service";
import axios from "axios";


export function EditMenu() {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const [menus, setMenus] = useState({
    title: "",
    mealList: [],
  });

  const [meals, setMeals] = useState();

  const [mealTitle, setMealTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalMealList, setExternalMealList] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAdminFunctions, setShowAdminFunctions] = useState(false);
  const [showUserFunctions, setShowUserFunctions] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminFunctions(user.roles.includes("ROLE_ADMIN"));
      setShowUserFunctions(user.roles.includes("ROLE_USER"));
    }
  }, []);


  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  // Fetch menu
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/FoodOrdering/menu/${params.id}`, { withCredentials: true })
      .then((response) => {
        const menusData = response.data;
        setMenus(menusData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);


  const fetchMeals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/FoodOrdering/meal/all/${params.id}`, {
        withCredentials: true,
      });

      setExternalMealList(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);


  const createMeal = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/FoodOrdering/meal?menuId=${params.id}`,
        {
          title: mealTitle,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      handleModalClose();
      fetchMeals();
    } catch (error) {
      console.error(error);
    }
  };

  const updateMenus = async () => {
    const updatedMenus = { ...menus, title: menus.title };
  
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/FoodOrdering/menu/update/${params.id}`,
        updatedMenus,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        setError(null);
        setIsUpdateSuccessful(true); // Set the success status
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteMeal = async (id) => {
    axios
      .delete(`http://localhost:8080/api/FoodOrdering/meal/delete/${params.id}/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        fetchMeals();
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setMealTitle("");
    setDescription("");
  };

  const updateProperty = (property, event) => {
    if (event.target.value === "") {
      setMenus((prevMenus) => ({ ...prevMenus, [property]: "" }));
    } else {
      setMenus((prevMenus) => ({ ...prevMenus, [property]: event.target.value }));
    }
  };

  return (
    <div>
      <MainMenu />


      <Grid columns={2}>

        <Grid.Column width={2} id="main"></Grid.Column>
        <Grid.Column textAlign="left" verticalAlign="top" width={13}>
          <Segment id="segment" color="blue">
            <div>
              {isUpdateSuccessful && (
                <div className="ui success message">
                  <i className="close icon" onClick={() => setIsUpdateSuccessful(false)}></i>
                  <div className="header">Update Successful</div>
                  <p>The menu has been updated successfully.</p>
                </div>
              )}

              <Modal open={modalOpen} onClose={handleModalClose}>
                <Modal.Header>Dishes</Modal.Header>
                <Modal.Content>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ paddingRight: "5%" }}>
                      <h4>Title</h4>
                      <div className="ui input">
                        <input onChange={(e) => setMealTitle(e.target.value)} type="text" placeholder="Title" />
                      </div>
                    </div>

                    <div style={{ paddingRight: "5%" }}>
                      <h4>Description</h4>
                      <div className="ui input">
                        <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button onClick={createMeal} className="ui blue button">
                      Add
                    </Button>
                    <button onClick={handleModalClose} className="ui red button">
                      Cancel
                    </button>
                  </div>
                </Modal.Content>
              </Modal>

              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>Menu title</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell collapsing>
                      {showAdminFunctions && <Input value={menus.title} onChange={(e) => updateProperty("title", e)} />}
                      {showUserFunctions && <div>{menus.title}</div>}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>

              <Table celled color="blue">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={4}>Dishes</Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    {showAdminFunctions && (
                      <Table.HeaderCell>Actions</Table.HeaderCell>
                    )}
                    
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {externalMealList.map((meal) => (
                    <Table.Row key={meal.id}>
                      <Table.Cell>{meal.title}</Table.Cell>
                      <Table.Cell>{meal.description}</Table.Cell>
                      <Table.Cell collapsing>
                        {showAdminFunctions && (
                          <Link to={`/meal/edit/${params.id}/${meal.id}`}>
                            <Button id="icocolor" basic compact icon="edit" title="Edit" />
                          </Link>
                        )}
                        {showAdminFunctions && (
                          <Button
                            id="icocolor"
                            basic
                            compact
                            title="Delete"
                            icon="trash"
                            onClick={() => setOpen(meal.id)}
                          />
                        )}
                        <Confirm
                          open={open}
                          header="Attention!"
                          content="Are you sure you want to delete Meal?"
                          cancelButton="Cancel"
                          confirmButton="Yes"
                          onCancel={() => setOpen(false)}
                          onConfirm={() => deleteMeal(open)}
                          size="small"
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Divider hidden />
              {showAdminFunctions && (
                <Button primary className="controls" id="details" onClick={updateMenus}>
                  Update
                </Button>
              )}
              {showAdminFunctions && (
                <Button
                  id="details"
                  title="Create new dish"
                  icon
                  labelPosition="left"
                  className="controls"
                  onClick={handleModalOpen}
                >
                  <Icon name="plus" />
                  Add new dish
                </Button>
              )}
              <Button icon labelPosition="left" className="" href="#/menus">
                <Icon name="arrow left" />
                Back
              </Button>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}