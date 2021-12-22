import { Row, Col, Form } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils'

const Konfirmasi = ({
  keranjangs,
  nama,
  setNama,
  absen,
  setAbsen,
  catatan,
  setCatatan,
  totalJumlah,
  totalHarga
}) => {
  return (
    <Row>
      <Col className="col-8">
        <h3>Detail Pemesanan</h3>
        <hr className="w-25" />
        <Form>
          <Row>
            <Col>
              <h5>Nama Siswa:</h5>
              <input
                onChange={(e) => setNama(e.target.value)}
                value={nama}
                type="text"
                className="form-control"
              />
            </Col>
            <Col>
              <h5>No Absen:</h5>
              <select className="form-control" value={absen} onChange={(e) => setAbsen(e.target.value)}>
                {[...Array(32)].map((e, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <h3>Informasi Tambahan</h3>
          <hr className="w-25" />
          <h5>Catatan</h5>
          <textarea
            className="form-control"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          ></textarea>
        </Form>
      </Col>
      <Col className="col-4">
        <h3>Order Anda</h3>
        <hr className="w-25" />
        <div className="bg-secondary p-4 text-light rounded">
          <h6 className="float-start">Menu</h6>
          <h6 className="float-end">Total</h6>
          <br />
          <hr />
          {keranjangs.map((keranjang) => (
            <p key={keranjang.id} className="d-inline">
              <b>×{keranjang.jumlah} </b>
              <span>{keranjang.product.nama}</span>
              <span className="float-end">Rp. {numberWithCommas(keranjang.total_harga)}</span>
              <br />
            </p>
          ))}
          <hr />
          <h6 className="float-start">
            <b>Total Qty</b>
          </h6>
          <h6 className="float-end">{totalJumlah}</h6>
          <br />
          <hr />
          <h6 className="float-start">
            <b>Total Bayar</b>
          </h6>
          <h6 className="float-end">Rp. {numberWithCommas(totalHarga)}</h6>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default Konfirmasi;
