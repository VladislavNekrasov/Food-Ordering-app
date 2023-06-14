import React, { useEffect, useState } from "react";
import MainMenu from "../../Components/MainMenu";
import { Table, Button, Icon, Confirm } from "semantic-ui-react";
import { Link, NavLink, useParams } from "react-router-dom";
import axios from "axios";
import AuthService from "../../services/auth.service";

export function OrderSelection() {
    const { orderid } = useParams();
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

  useEffect(() => {
    fetchMenus();
  }, []);

  return (

    <div>
      <MainMenu />
      
      <div style={{ paddingLeft: "3%", paddingRight: "3%" }}>

        <Table selectable>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pavadinimas</Table.HeaderCell>
              <Table.HeaderCell>Pasirinkti</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {menus.map((menu) => (
              <Table.Row key={menu.id}>
                <Table.Cell>{menu.title}</Table.Cell>
                <Table.Cell collapsing>
                {showUserFunctions && (
                  <Link to={`/orders/create/${orderid}/menus/${menu.id}`}>
                    <Button
                      id="icocolor"
                      basic
                      compact
                      icon="plus"
                      title="Peržiūrėti"
                    ></Button>
                  </Link>
                )}

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
