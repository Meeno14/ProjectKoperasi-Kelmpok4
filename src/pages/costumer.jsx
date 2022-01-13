import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/costumer/navbar";
import Footer from "../components/costumer/footer";
import { Home, Details, Keranjang, Categories, Login } from "./index";
import axios from "axios";
import { API_URL } from "../components/utils/constants";

export class costumer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web_profile: {},
    };
  }

  componentDidMount() {
    axios.get(API_URL + "web_profile").then((res) => {
      const web_profile = res.data[0];
      this.setState({ web_profile });
    });
  }
  render() {
    return (
      <Router>
        <Navbar title={this.state.web_profile.name} />
        <Container className="my-4">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/details" exact element={<Details />} />
            <Route path="/keranjang" exact element={<Keranjang />} />
            <Route path="/categories" exact element={<Categories />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>
        </Container>
        <Footer web_profile={this.state.web_profile} />
      </Router>
    );
  }
}

export default costumer;
