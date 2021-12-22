import { Col, Row, Card, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'

const categorycontent = ({ items, masukKeranjang, itemDetail, categories }) => {
  return categories.map(category => (
    <div key={category.id} id={category.nama.toLowerCase()} className="mt-4">
      <h3>{category.nama}</h3>
      <hr />
      <Row>
        {items.filter(filtering => filtering.category.nama === category.nama).map(item => (
          <Col key={item.id} md={3} xs={4} style={{ padding: "0" }}>
            <Card className="shadow my-2 item text-center">
              <div onClick={() => itemDetail(item)}>
                <Card.Img onClick={() => itemDetail(item)} className="images" variant="top" src={"Assets/"
                  + item.category.nama.toLowerCase() + "/" + item.gambar} />
                <Card.Body>
                  <Card.Title>{item.nama}</Card.Title>
                  <hr style={{ margin: "0" }} /><b>Harga:</b>
                  <Card.Text>
                    Rp. {numberWithCommas(item.harga)}
                  </Card.Text>
                </Card.Body>
              </div>
              <div className="order">
                <Button variant="dark" onClick={() => masukKeranjang(item)}>Order</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  ))
}

export default categorycontent