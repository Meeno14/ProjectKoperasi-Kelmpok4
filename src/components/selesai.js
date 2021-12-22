import { Button } from 'react-bootstrap';

const selesai = () => {
  return (
    <div class="d-flex justify-content-center">
      <div className="text-center">
        <img src="Assets/success.svg" alt="" style={{ width: "50%" }} />
        <h2>Terima Kasih Telah Berbelanja di Koperasi</h2>
        <Button variant="dark" onClick={() => window.location.href = "/"}>Ok</Button>
      </div>
    </div>
  );
};

export default selesai;
