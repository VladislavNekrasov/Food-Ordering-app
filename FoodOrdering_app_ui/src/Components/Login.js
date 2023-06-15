import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Message, Card } from "semantic-ui-react";

import AuthService from "../services/auth.service";
import MainMenu from "./MainMenu";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        if (!username) {
            setMessage("Username is required!");
            setLoading(false);
            return;
        }

        if (!password) {
            setMessage("Password is required!");
            setLoading(false);
            return;
        }

        AuthService.login(username, password)
            .then(() => {
                navigate("/profile");
                window.location.reload();
            })
            .catch((error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            });
    };

    return (
        <div>
            <MainMenu />
            <div className="ui container">
                <Card centered>
                <Card.Content>
                <div style={{ margin: "0 auto", textAlign: "center", paddingBottom: "8%" }}>
                        <img
                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                            alt="profile-img"
                            className="ui centered small image"
                        />
                </div>
                <Form onSubmit={handleLogin}>
                            <Form.Field>
                                <label>Username</label>
                                <Form.Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Password</label>
                                <Form.Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Field>

                            <Button primary fluid type="submit" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </Button>

                            {message && (
                                <Message negative>
                                    <Message.Header>Error</Message.Header>
                                    <p>{message}</p>
                                </Message>
                            )}
                        </Form>
                </Card.Content>
                </Card>
            </div>  
            </div>

    );
};

export default Login;
