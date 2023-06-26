import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ViewMenu } from './Pages/Menu/ViewMenu';
import { CreateMenu } from './Pages/Menu/CreateMenu';
import { EditMenu } from './Pages/Menu/EditMenu';
import { EditMeal } from './Pages/Meal/EditMeal';

import Home from './Components/Home';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Register from './Components/Register';
import ShowOrdersBasedOnUser from './Pages/Order/ShowOrdersBasedOnUser';






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <HashRouter >

      <Routes>

        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route path="/menus" element={<ViewMenu />} />
        <Route path="/menus/view/:id" element={<EditMenu />} />
        <Route path="/menus/edit/:id" element={<EditMenu />} />
        <Route path="/menus/create" element={<CreateMenu />} />

        <Route path="/meal/edit/:menuid/:mealid" element={<EditMeal />} />


{/* ORDERS */}
        <Route path="/orders" element={<ShowOrdersBasedOnUser/>} />
      </Routes>



    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
