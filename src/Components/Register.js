import React, { useState } from "react";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import { Form, Input, Button, Message, Card } from "semantic-ui-react";
import MainMenu from "./MainMenu";



const Register = (props) => {
    
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setMessage("The username must be between 3 and 20 characters.");
      return;
    }

    if (!isEmail(email)) {
      setMessage("This is not a valid email.");
      return;
    }

    if (password.length < 6 || password.length > 40) {
      setMessage("The password must be between 6 and 40 characters.");
      return;
    }

    AuthService.register(username, email, password)
      .then((response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  return (
    <div>
        <MainMenu/>
        <div className="ui container">
      <Card centered>
        <Card.Content>
        <div style={{ margin: "0 auto", textAlign: "center" , paddingBottom: "8%"}}>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className="ui centered small image"
            />
          </div>
          <Form onSubmit={handleRegister}>
            {!successful && (
              <>
                <Form.Field>
                  <label>Username</label>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Email</label>
                  <Input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </Form.Field>

                <Button primary fluid type="submit">
                  Sign Up
                </Button>
              </>
            )}

            {message && (
              <Message positive={successful} negative={!successful}>
                <Message.Header>{message}</Message.Header>
              </Message>
            )}
          </Form>
        </Card.Content>
      </Card>
    </div>
    </div>
    
    
  );
};

export default Register;
