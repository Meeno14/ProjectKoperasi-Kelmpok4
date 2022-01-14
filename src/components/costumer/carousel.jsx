import { Carousel } from 'react-bootstrap'

const carousel = ({ carousel }) => {
  return (
    <Carousel variant="dark" style={{ marginTop: "-5%" }}>
      {carousel.map((image) => (
        <Carousel.Item key={image.id}>
          <img
            className="d-block w-100 car-img"
            src={"Assets/" + image.category + "/" + image.image}
            alt="First slide"
          />
        </Carousel.Item>
      ))}

    </Carousel>
  );
};

export default carousel
