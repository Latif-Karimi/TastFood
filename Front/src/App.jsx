import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./screen/Home";
import { Login } from "./screen/Login";
import { Signup } from "./screen/Signup";
import { Cart } from "./screen/Cart";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { CardProvider } from "./components/ContexReducer";

export const App = () => {
  return (
    <CardProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/cart" element={<Cart/>}/>
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
};
