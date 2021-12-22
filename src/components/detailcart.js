import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { numberWithCommas } from '../utils/utils'

const detailcart = ({ keranjangs, kurang, tambah, updateInput, remove }) => {
  return (
    <table className="w-100 text-center">
      <thead>
        <tr>
          <th></th>
          <th className="text-start">Menu</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Sub Total</th>
        </tr>
      </thead>
      <tbody>
        {keranjangs.map((keranjang, index) => (
          <tr className="border-top border-bottom" key={keranjang.id}>
            <td style={{ width: "3%" }}>
              <Button onClick={() => remove(keranjang)} variant="dark" className="mx-4 btn-sm">x</Button>
            </td>
            <td className="w-25">
              <img
                alt=""
                src={
                  "Assets/" +
                  keranjang.product.category.nama.toLowerCase() +
                  "/" +
                  keranjang.product.gambar
                }
                className="w-50 my-4"
              /> {keranjang.product.nama}
            </td>
            <td>Rp. {numberWithCommas(keranjang.product.harga)}</td>
            <td>
              <Button
                className="btn-sm"
                variant="dark"
                onClick={() => kurang(index)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <input
                className="rounded border text-center jumlah mx-1"
                type="number"
                value={keranjang.jumlah}
                onChange={updateInput(index)}
              />
              <Button
                className="btn-sm"
                variant="dark"
                onClick={() => tambah(index)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </td>
            <td>Rp. {numberWithCommas(keranjang.total_harga)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default detailcart;
