CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
   name VARCHAR(20),
   CONSTRAINT pk_roles PRIMARY KEY (id)
);

CREATE TABLE users (
  id BIGINT AUTO_INCREMENT NOT NULL,
   username VARCHAR(20),
   email VARCHAR(50),
   password VARCHAR(120),
   CONSTRAINT pk_users PRIMARY KEY (id),
   CONSTRAINT uc_74165e195b2f7b25de690d14a UNIQUE (email),
    CONSTRAINT uc_77584fbe74cc86922be2a3560 UNIQUE (username)
);


CREATE TABLE user_roles (
  role_id INT NOT NULL,
   user_id BIGINT NOT NULL,
   CONSTRAINT pk_user_roles PRIMARY KEY (role_id, user_id),
   CONSTRAINT fk_userol_on_role FOREIGN KEY (role_id) REFERENCES roles (id),
    CONSTRAINT fk_userol_on_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE menu (
  id BIGINT AUTO_INCREMENT NOT NULL,
   title VARCHAR(255),
   CONSTRAINT pk_menu PRIMARY KEY (id)
);

CREATE TABLE orders (
  id BIGINT AUTO_INCREMENT NOT NULL,
   confirmed BOOLEAN NOT NULL,
   CONSTRAINT pk_orders PRIMARY KEY (id)
);


CREATE TABLE meal (
  id BIGINT AUTO_INCREMENT NOT NULL,
   title VARCHAR(255),
   description VARCHAR(255),
   menu_id BIGINT,
   order_id BIGINT,
   CONSTRAINT pk_meal PRIMARY KEY (id),
   CONSTRAINT FK_MEAL_ON_MENU FOREIGN KEY (menu_id) REFERENCES menu (id),
   CONSTRAINT FK_MEAL_ON_ORDER FOREIGN KEY (order_id) REFERENCES orders (id)
);


