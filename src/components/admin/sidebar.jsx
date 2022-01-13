import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCogs,
  faPhoneAlt,
  faFolder,
  faStream,
  faDesktop,
  faDoorClosed,
  faWifi,
  faUser,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

export class sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
    };
  }
  dropdown = () => {
    if (this.state.collapse) {
      this.setState({ collapse: false });
    } else {
      this.setState({ collapse: true });
    }
  };
  choose = () => { };

  render() {
    return (
      <div>
        <div
          className="offcanvas offcanvas-start sidebar-nav bg-dark"
          tabIndex="-1"
          id="sidebar"
          overflow="hidden"
        >
          <div className="offcanvas-body p-0">
            <nav className="navbar-dark">
              <ul className="navbar-nav">
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3">
                    CORE
                  </div>
                </li>
                <li>
                  <a href="/" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faTachometerAlt} />
                    </span>
                    <span>Dashboard</span>
                  </a>
                  <a href="/settings" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faCogs} />
                    </span>
                    <span>Settings</span>
                  </a>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                    MENU MASTER
                  </div>
                </li>
                <li>
                  <a href="/contact" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faPhoneAlt} />
                    </span>
                    <span>Kontak</span>
                  </a>
                  <a
                    className="nav-link px-3 sidebar-link"
                    data-bs-toggle="collapse"
                    onClick={() => this.dropdown()}
                  >
                    <span className="me-2">
                      <FontAwesomeIcon icon={faFolder} />
                    </span>
                    <span>Data Master</span>
                    <span className="ms-auto">
                      <span className="right-icon">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </span>
                    </span>
                  </a>
                  <div className={!this.state.collapse && "collapse"}>
                    <ul className="navbar-nav ps-3">
                      <li>
                        <a href="/slider" className="nav-link px-3">
                          <span className="me-2">
                            <FontAwesomeIcon icon={faStream} />
                          </span>
                          <span>Slider</span>
                        </a>
                        <a href="/category" className="nav-link px-3">
                          <span className="me-2">
                            <FontAwesomeIcon icon={faStream} />
                          </span>
                          <span>Kategori</span>
                        </a>
                        <a href="/menu" className="nav-link px-3">
                          <span className="me-2">
                            <FontAwesomeIcon icon={faStream} />
                          </span>
                          <span>Menu</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                    MENU TRANSAKSI
                  </div>
                </li>
                <li>
                  <a href="/#" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faDesktop} />
                    </span>
                    <span>Monitoring</span>
                  </a>
                </li>
                <li>
                  <a href="/order" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faDoorClosed} />
                    </span>
                    <span>Order</span>
                  </a>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                    ADDITIONAL
                  </div>
                </li>
                <li>
                  <a href="/#" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faWifi} />
                    </span>
                    <span>Social Media</span>
                  </a>
                </li>
                <li className="my-4">
                  <hr className="dropdown-divider bg-light" />
                </li>
                <li>
                  <div className="text-muted small fw-bold text-uppercase px-3 mb-3">
                    MENU USERS
                  </div>
                </li>
                <li>
                  <a href="/#" className="nav-link px-3">
                    <span className="me-2">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <span>Users</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default sidebar;
