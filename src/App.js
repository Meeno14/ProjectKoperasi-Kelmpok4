import React, { Component } from "react";
// import { Container } from "react-bootstrap";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./component/costumer/navbar";
// import Footer from "./component/costumer/footer";
import { Costumer, Admin } from "./pages";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
    };
  }
  render() {
    const admin = localStorage.getItem("admin");
    function Roles() {
      if (admin === "loggedIn") {
        return <Admin />;
      } else {
        return <Costumer />;
      }
    }
    return <Roles />;
  }
}

export default App;
