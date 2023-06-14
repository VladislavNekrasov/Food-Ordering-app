--MENUS
INSERT INTO menu (title) VALUES ('Desertu meniu'), ('Gerimu meniu'),('Karstu patiekalu meniu'), ('Vaikiskas meniu');

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
--MEALS




--USERS
--/Password: adminadmin
INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', '$2a$12$OHWDpe/lQZ2nR5Txep3KTOirV6HLR5EjcuG3jh/pjHocZzDI2GEGm');
INSERT INTO user_roles (role_id, user_id)
SELECT
    (SELECT id FROM roles WHERE name = 'ROLE_ADMIN'),
    (SELECT id FROM users WHERE username = 'admin');

--Password: useruser
INSERT INTO users (username, email, password) VALUES ('user', 'user@example.com', '$2a$12$v6qH5hv/LbSNoSFDSo8vHOqAP4SbD4yqwmQ/7jTthGsSX7iXVHwTu');
INSERT INTO user_roles (role_id, user_id)
SELECT
     (SELECT id FROM roles WHERE name = 'ROLE_USER'),
     (SELECT id FROM users WHERE username = 'user');


