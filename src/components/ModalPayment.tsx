import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalPayment.css";

function ModalPayment(props: any) {
  const [adult, setAdult] = useState<number | string>("");
  const [child, setChild] = useState<number | string>("");
  const [price, setprice] = useState<number | string>("");
  const [cash, setCash] = useState<number | string>("");
  const [isPayment, setIsPayment] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);

  function emptyValue() {
    setAdult("");
    setChild("");
    setprice("");
    setCash("");
    setIsPayment(false);
    setIsWithdraw(false);
  }

  function onChangeAdult(event: ChangeEvent<HTMLInputElement>) {
    setAdult(event.target.value);
  }
  function onChangeChild(event: ChangeEvent<HTMLInputElement>) {
    setChild(event.target.value);
  }

  function onChangeCash(event: ChangeEvent<HTMLInputElement>) {
    setCash(event.target.value);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPayment(true);

    setprice(Number(adult) * 199 + Number(child) * 129);
  }

  useEffect(() => {
    const cashEl = document.getElementById("cashEl");
    if (cashEl) {
      cashEl.focus();
    }
  }, [isPayment]);

  function onPaymentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsWithdraw(true);
  }

  function onSuccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.offTables(props.tablePayment);
    emptyValue();
    props.onHide();
  }

  function goToFormformPaymentElement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCash("");
    setIsWithdraw(false);
  }
  function closePayment() {
    emptyValue();
    props.onHide();
  }

  let formCusElement = (
    <form onSubmit={onSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon1">
          ผู้ใหญ่
        </span>
        <input
          type="text"
          className="form-control"
          aria-describedby="basic-addon1"
          value={adult}
          placeholder="0"
          pattern="[0-9]+"
          maxLength={2}
          autoFocus
          required
          onChange={onChangeAdult}
        />
        <span className="input-group-text" id="basic-addon1">
          คน
        </span>
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text " id="basic-addon2">
          <span className="px-2 ">เด็ก </span>
        </span>
        <input
          type="text"
          className="form-control"
          aria-describedby="basic-addon2"
          value={child}
          placeholder="0"
          pattern="[0-9]+"
          maxLength={2}
          onChange={onChangeChild}
        />
        <span className="input-group-text" id="basic-addon2">
          คน
        </span>
      </div>
      <hr />
      <Button type="submit" className="w-100 fw-bold">
        คำนวณ
      </Button>
    </form>
  );

  let formPaymentElement = (
    <form onSubmit={onPaymentSubmit}>
      <h4 className="text-center mb-3">
        ราคาอาหารที่ต้องชำระ <br />
        {price} บาท{" "}
      </h4>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">
          ชำระเงิน
        </span>
        <input
          id="cashEl"
          type="text"
          className="form-control"
          aria-describedby="basic-addon3"
          value={cash}
          placeholder="0"
          pattern="[0-9]+"
          maxLength={7}
          onChange={onChangeCash}
        />
        <span className="input-group-text" id="basic-addon3">
          บาท
        </span>
      </div>
      <hr />
      <Button type="submit" className="w-100 fw-bold">
        ชำระเงิน
      </Button>
    </form>
  );

  let formWithdrawElement =
    Number(cash) - Number(price) >= 0 ? (
      <form onSubmit={onSuccess}>
        <h4 className="text-center">
          จำนวนเงินทอน <br />
          {Number(cash) - Number(price)} บาท
        </h4>
        <hr />
        <Button type="submit" autoFocus className="w-100 fw-bold">
          ชำระเงินเรียบร้อย
        </Button>
      </form>
    ) : (
      <form onSubmit={goToFormformPaymentElement}>
        <h4 className="text-center">
          จำนวนเงินไม่พอ
          <br />
          ชำระค่าอาหาร
        </h4>
        <hr />
        <Button type="submit" className="w-100 fw-bold" autoFocus>
          กลับ
        </Button>
      </form>
    );

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      animation={false}
    >
      <Modal.Header className="bg-black border border-white">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="w-100 text-white  fw-bold"
        >
          โต๊ะ {props.tablePayment} ชำระเงิน
        </Modal.Title>
        <i className="bi bi-x-lg float-right" onClick={closePayment}></i>
      </Modal.Header>
      <Modal.Body className="bg-black text-white border border-white">
        {isWithdraw
          ? formWithdrawElement
          : isPayment
          ? formPaymentElement
          : formCusElement}
      </Modal.Body>
    </Modal>
  );
}

export default ModalPayment;
