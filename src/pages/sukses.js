import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constants'
import axios from 'axios'

export class sukses extends Component {
  componentDidMount() {
    axios.get(API_URL + 'keranjangs').then(res => {
      const keranjangs = res.data;
      keranjangs.map(function (item) {
        return axios.delete(API_URL + 'keranjangs/' + item.id)
          .then((res) => console.log(res))
      })
    })
  }
  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.svg" height="200px" />
        <h2>Sukses Pesan</h2>
        <p>Terima Kasih Sudah Memesan</p>
        <Button variant="dark" as={Link} to="/">
          Kembali
        </Button>
      </div>
    )
  }
}

export default sukses
