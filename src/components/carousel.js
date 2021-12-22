import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

export class carousel extends Component {
  render() {
    return (
      <Carousel variant="dark">
        <Carousel.Item>
          <img
            className="d-block w-100 car-img"
            src="Assets/carousel/soda.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 car-img"
            src="Assets/carousel/permen.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    )
  }
}

export default carousel
