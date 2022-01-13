import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Sidebar, Dashboard, DetailMenu, DetailIncome, DetailTotal, Settings, Slider, Contact, Order, Category, Menu } from "../components/admin/";

export class admin extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Sidebar />
          <main className="mt3">
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/detail-menu" exact element={<DetailMenu />} />
              <Route path="/detail-income" exact element={<DetailIncome />} />
              <Route path="/detail-total" exact element={<DetailTotal />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/slider" exact element={<Slider />} />
              <Route path="/category" exact element={<Category />} />
              <Route path="/order" exact element={<Order />} />
              <Route path="/menu" exact element={<Menu />} />
            </Routes>
          </main>
        </Router>
        <Navbar />
      </div>
    );
  }
}

export default admin;
