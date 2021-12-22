import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="All">
        <p className="text-center container">
          Koperasi sekolah adalah koperasi yang didirikan di lingkungan sekolah
          yang anggota-anggotanya terdiri atas siswa sekolah. Koperasi sekolah
          dapat didirikan pada berbagai tingkatan sesuai jenjang pendidikan,
          misalnya koperasi sekolah dasar, koperasi sekolah menengah pertama,
          dan seterusnya. Adapun koperasi sekolah juga dapat dimaknai sebagai
          koperasi yang berada pada lembaga pendidikan lain, selain pendidikan
          formal, seperti yayasan, lembaga masyarakat, pesantren, dll.
        </p>

        <div style={{ fontSize: "30px" }} className="d-flex justify-content-center">
          <p>
            <i className="fa fa-facebook mx-2" />
            <i className="fa fa-twitter mx-2" />
            <i className="fa fa-google-plus mx-2" />
            <i className="fa fa-linkedin mx-2" />
          </p>
        </div>

        <div className="d-flex justify-content-center">
          <div className="mx-4">
            <h3>Help Center</h3>
            <ul className="list-unstyled">
              <li>
                <i className="fa fa-angle-double-right" /> How to Pay
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> FAQ's
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Sitemap
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Delivery Info
              </li>
            </ul>
          </div>

          <div className="mx-4">
            <h3>Customer information</h3>
            <ul className="list-unstyled">
              <li>
                <i className="fa fa-angle-double-right" /> About Us
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> FAQ's
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Sell Your Items
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Contact Us
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> RSS
              </li>
            </ul>
          </div>

          <div className="mx-4">
            <h3>Security & privacy</h3>
            <ul className="list-unstyled">
              <li>
                <i className="fa fa-angle-double-right" /> Terms Of Use
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Privacy Policy
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Return / Refund Policy
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Store Locations
              </li>
            </ul>
          </div>

          <div className="mx-4">
            <h3>School Cooperative</h3>
            <ul className="list-unstyled">
              <li>
                <i className="fa fa-angle-double-right" /> Member
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Manager
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Examining Body
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Trustees and
                Supervisors
              </li>
              <li>
                <i className="fa fa-angle-double-right" /> Advisory Board
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
