import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Home, Sukses, Details, Keranjang, Categories } from "./pages";

export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/sukses" exact element={<Sukses />} />
            <Route path="/details" exact element={<Details />} />
            <Route path="/keranjang" exact element={<Keranjang />} />
            <Route path="/categories" exact element={<Categories />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    );
  }
}

export default App;
