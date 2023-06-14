import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Table, Button, Icon, Confirm } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";




export function ViewMenu() {
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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
  
  const fetchMenus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/FoodOrdering/menu/all`, { withCredentials: true });
      setMenus(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const DeleteMenu = async (id) => {
    axios.delete("http://localhost:8080/api/FoodOrdering/menu/delete/" + id, { withCredentials: true })
      .then(fetchMenus)
      .then(setOpen(false));
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (

    <div>
      <MainMenu />
      
      <div style={{ paddingLeft: "3%", paddingRight: "3%" }}>

      {showAdminFunctions && (
             <Button
          id="details"
          title="Kurti naują meniu"
          icon
          labelPosition="left"
          className="controls"
          as={NavLink}
          exact
          to="/menus/create"
        >
          <Icon name="plus" />
          Kurti naują meniu
        </Button> 
            )}
        

        <Table selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
              <Table.HeaderCell>Redagavimas</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {menus.map((menu) => (
              <Table.Row key={menu.id}>
                <Table.Cell>{menu.title}</Table.Cell>
                <Table.Cell collapsing>
                {showUserFunctions && (
                  <Link to={`/menus/view/${menu.id}`}>
                    <Button
                      id="icocolor"
                      basic
                      compact
                      icon="plus"
                      title="Peržiūrėti"
                    ></Button>
                  </Link>
                )}

                

                  {showAdminFunctions && (
                    <Link to={`/menus/edit/${menu.id}`}>
                    <Button
                      id="icocolor"
                      basic
                      compact
                      icon="edit"
                      title="Redaguoti"
                    ></Button>
                  </Link>
                  )}

                  {showAdminFunctions && (
                    <Button
                    id="icocolor"
                    basic
                    compact
                    title="Istrinti"
                    icon="trash"
                    onClick={() => setOpen(menu.id)}
                  ></Button>
                  )}
                  
                  <Confirm
                    open={open}
                    header="Dėmesio!"
                    content="Ar tikrai norite Istrinti?"
                    cancelButton="Atgal"
                    confirmButton="Taip"
                    onCancel={() => setOpen(false)}
                    onConfirm={() => DeleteMenu(open)}
                    size="small"
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

        </Table>
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );

}
