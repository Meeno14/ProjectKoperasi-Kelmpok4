import swal from "sweetalert";
import axios from "axios";
import { Button } from "react-bootstrap";
import DetailCart from "./detailcart";
import Konfirmasi from "./konfirmasi";
import OrderDetail from "./orderdetail";
import Selesai from "./selesai";
import { useState, useEffect } from "react"
import { API_URL } from "../utils/constants";

const StepperContent = ({ activeStep, setActiveStep }) => {
  const [keranjangs, setKeranjangs] = useState([]);
  const [nama, setNama] = useState("");
  const [absen, setAbsen] = useState(1);
  const [catatan, setCatatan] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const updateNext = () => {
    keranjangs.map(function (item) {
      return axios.put(API_URL + "keranjangs/" + item.id, item);
    });
    handleNext();
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const backToHome = () => {
    keranjangs.map(function (item) {
      return axios.put(API_URL + "keranjangs/" + item.id, item);
    });
    window.location.href = "/";
  };
  const selesaiPesan = () => {
    const payload = {
      pemesan: nama,
      absen: absen,
      catatan: catatan,
      harga_total: totalHarga,
      item: keranjangs
    }
    axios.post(API_URL + "pesanans", payload).then((res) => {
      keranjangs.map(function (item) {
        return axios.delete(API_URL + "keranjangs/" + item.id).then(res => {
          handleNext()
        });
      });
    })
  }
  const getKeranjangs = () => {
    axios.get(API_URL + "keranjangs").then((res) => {
      setKeranjangs(res.data);
    });
  }
  useEffect(() => {
    getKeranjangs()
  }, []);
  let newArr = [...keranjangs];
  const updateTotalHarga = (index) => {
    newArr[index].total_harga =
      newArr[index].jumlah * newArr[index].product.harga;
    setKeranjangs(newArr);
  };
  const updateInput = (index) => (e) => {
    if (e.target.value > 0) {
      newArr[index].jumlah = e.target.value;
      setKeranjangs(newArr);
      updateTotalHarga(index);
    } else {
      swal({
        title: "Beli Debih Dari 0",
        text: "Jumlah Barang Tidak Bisa Kurang Dari 1",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  };
  const kurang = (index) => {
    if (newArr[index].jumlah > 1) {
      newArr[index].jumlah = newArr[index].jumlah - 1;
      setKeranjangs(newArr);
      updateTotalHarga(index);
    } else {
      swal({
        title: "Beli Debih Dari 0",
        text: "Jumlah Barang Tidak Bisa Kurang Dari 1",
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  };
  const tambah = (index) => {
    newArr[index].jumlah = newArr[index].jumlah + 1;
    setKeranjangs(newArr);
    updateTotalHarga(index);
  };
  const totalJumlah = keranjangs.reduce(function (result, item) {
    return parseInt(result) + parseInt(item.jumlah);
  }, 0);
  const totalHarga = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);
  const remove = (keranjang) => {
    axios.delete(API_URL + "keranjangs/" + keranjang.id).then((res) => {
      getKeranjangs()
      swal({
        title: keranjang.product.nama + " Telah di Hapus",
        text: "Berhasil Mengahapus " + keranjang.product.nama + " Dari Keranjang",
        icon: "error",
        button: false,
        timer: 1000,
      });
    })
  }
  function StepperContent() {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <DetailCart
              keranjangs={keranjangs}
              kurang={kurang}
              tambah={tambah}
              updateInput={updateInput}
              remove={remove}
            />
            <div className="d-inline pt-4">
              <Button variant="dark" className="float-start my-4"
                onClick={backToHome}>Back</Button>
              <Button variant="dark" className="float-end my-4"
                onClick={updateNext}>Next</Button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <Konfirmasi
              keranjangs={keranjangs}
              nama={nama}
              setNama={setNama}
              absen={absen}
              setAbsen={setAbsen}
              catatan={catatan}
              setCatatan={setCatatan}
              totalHarga={totalHarga}
              totalJumlah={totalJumlah}
            />
            <div className="d-inline pt-4">
              <Button variant="dark" className="float-start my-4" onClick={handleBack}>Back</Button>
              <Button variant="dark" className="float-end my-4"
                onClick={handleNext} disabled={nama === ""}>Next</Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <OrderDetail
              nama={nama}
              absen={absen}
              catatan={catatan}
              keranjangs={keranjangs}
              total={totalHarga}
            />
            <div className="d-inline pt-4">
              <Button variant="dark" className="float-start my-4" onClick={handleBack}>Back</Button>
              <Button variant="dark" className="float-end my-4"
                onClick={selesaiPesan}>Selesai</Button>
            </div>
          </div>
        );
      default:
        return <Selesai />
    }
  }
  return <StepperContent />;
};

export default StepperContent;
