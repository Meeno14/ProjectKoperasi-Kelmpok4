import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    const { web_profile } = this.props;
    return (
      <div className="All">
        <p className="text-center container mt-3">{web_profile.description}</p>
        <div className="d-flex justify-content-center my-5">
          <span className="px-5 text-capitalize">{web_profile.name}</span>
          <span className="px-5 border-start">{web_profile.address}</span>
          <span className="px-5 border-start">{web_profile.email}</span>
          <span className="px-5 border-start">{web_profile.number}</span>
        </div>
        <div
          style={{ fontSize: "30px" }}
          className="d-flex justify-content-center"
        >
          <p>
            <i className="fa fa-facebook mx-2" />
            <i className="fa fa-twitter mx-2" />
            <i className="fa fa-google-plus mx-2" />
            <i className="fa fa-linkedin mx-2" />
          </p>
        </div>
      </div>
    );
  }
}
