import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Label } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";


const MainMenu = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  

 
  return (
    <div>
      <Menu>
        <Menu.Item as={Link} to={"/home"}>
          Home
        </Menu.Item>
        {currentUser && (
          <Menu.Item as={Link} to={"/menus"}>
            Menu
          </Menu.Item>
        )}

        {currentUser && (
          <Menu.Item as={Link} to={"/orders"}>
            Orders
          </Menu.Item>
        )}

        <Menu.Menu position="right">
          {currentUser ? (
            <>
              <Menu.Item as={Link} to={"/profile"}>
                {currentUser.username}
              </Menu.Item>
              <Menu.Item as={Link} to={"/login"} onClick={logOut}>
                LogOut
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item as={Link} to={"/login"}>
                Login
              </Menu.Item>
              <Menu.Item as={Link} to={"/register"}>
                Sign Up
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default MainMenu;
