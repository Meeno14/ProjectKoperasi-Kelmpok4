import { numberWithCommas } from '../utils/utils'

const orderdetail = ({ keranjangs, nama, absen, catatan, total }) => {
  return (
    <div>
      <h3>Order Detail</h3>
      <table className="w-100">
        <thead>
          <tr className=" border-top border-bottom order-list">
            <th>Menu</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {keranjangs.map((keranjang) => (
            <tr className="border-top border-bottom order-list">
              <td>{keranjang.product.nama} x {keranjang.jumlah}</td>
              <td>Rp. {numberWithCommas(keranjang.total_harga)}</td>
            </tr>
          ))}
          <tr className="border-top border-bottom order-list">
            <td><b>Total:</b></td>
            <td>Rp. {numberWithCommas(total)}</td>
          </tr>
        </tbody>
      </table>

      <h3>Detail Pembeli</h3>
      <table className="w-100">
        <tbody>
          <tr className="border-top border-bottom order-list">
            <td><b>Nama:</b></td>
            <td>{nama}</td>
          </tr>
          <tr className="border-top border-bottom order-list">
            <td><b>No Absen:</b></td>
            <td>{absen}</td>
          </tr>
          <tr className="border-top border-bottom order-list">
            <td><b>Catatan:</b></td>
            <td>{catatan}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default orderdetail;
