import React from "react";
import AuthService from "../services/auth.service";
import { Container, Divider, Header, List, Segment } from "semantic-ui-react";
import MainMenu from "./MainMenu";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  return (
    <div>
      <MainMenu/>
      <Divider hidden></Divider>
      <Container>
      <Segment>
        <Header as="h3">
          <strong>{currentUser.username}</strong> Profile
        </Header>
        
        <p>
          <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <List>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => (
              <List.Item key={index}>{role}</List.Item>
            ))}
        </List>
      </Segment>
    </Container>

    </div>
    
  );
};

export default Profile;
