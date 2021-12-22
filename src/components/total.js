import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { API_URL } from '../utils/constants'

export class total extends Component {
  bayar = (total) => {
    const pesanan = {
      total_bayar: total,
      menus: this.props.keranjangs
    }
    axios.post(API_URL + 'pesanans', pesanan)
  }
  render() {
    const total = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga
    }, 0);
    return (
      <>
        {/* Web */}
        <div className="mt-3 fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>Total Harga:<b> Rp. {numberWithCommas(total)}</b></h5>
              <div className="d-grid gap-2">
                <Button
                  as={Link} to="/sukses"
                  className="my-2"
                  variant="dark"
                  onClick={() => this.bayar(total)}>
                  <FontAwesomeIcon icon={faShoppingCart} /> <b>BAYAR</b>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        {/* Mobile */}
        <div className="mt-3 d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-4">
              <h5>Total Harga:<b> Rp. {numberWithCommas(total)}</b></h5>
              <div className="d-grid gap-2">
                <Button
                  as={Link} to="/sukses"
                  className="my-2"
                  variant="dark"
                  onClick={() => this.bayar(total)}>
                  <FontAwesomeIcon icon={faShoppingCart} /> <b>BAYAR</b>
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default total
