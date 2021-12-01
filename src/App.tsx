import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import tables from "./data/tables";
import { Header } from "./components/Header";
import { Tables } from "./components/Tables";
import { NumberTablesProps } from "./interfaces/NumberTablesProps";
import { TableStatus } from "./components/TableStatus";
import { Row, Col } from "react-bootstrap";
import ModalPayment from "./components/ModalPayment";

function App() {
  const [numberTables, setNumberTables] = useState<
    NumberTablesProps["numberTables"]
  >(() => {
    const saveNumberTables = localStorage.getItem("numberTables");

    if (saveNumberTables) {
      return JSON.parse(saveNumberTables);
    } else {
      return tables;
    }
  });

  const [modalShow, setModalShow] = useState(false);
  const [tablePayment, setTablePayment] = useState(1);

  const [qtyTables, setQtyTables] = useState<number>(() => {
    const saveqtyTables = localStorage.getItem("qtyTables");

    if (saveqtyTables) {
      return JSON.parse(saveqtyTables);
    } else {
      return 8;
    }
  });

  useEffect(() => {
    localStorage.setItem("numberTables", JSON.stringify(numberTables));
    localStorage.setItem("qtyTables", JSON.stringify(qtyTables));
  }, [numberTables]);

  const onTables = (no: number) => {
    const newNumberTables = numberTables;
    newNumberTables.forEach((numberTable) => {
      if (numberTable.no === no) numberTable.color = "danger";
      setQtyTables(qtyTables - 1);
    });
    setNumberTables([...newNumberTables]);
  };

  const offTables = (no: number) => {
    const newNumberTables = numberTables;
    newNumberTables.forEach((numberTable) => {
      if (numberTable.no === no) numberTable.color = "success";
      setQtyTables(qtyTables + 1);
    });
    setNumberTables([...newNumberTables]);
  };

  const onPayment = (no: number) => {
    setTablePayment(no);
    setModalShow(true);
  };

  return (
    <div className="bg-dark App">
      <Header />
      <Row>
        <Col sm={8} lg={9}>
          <Tables
            numberTables={numberTables}
            onTables={onTables}
            onPayment={onPayment}
          />
        </Col>
        <Col sm={4} lg={3}>
          <TableStatus qtyTables={qtyTables} />
        </Col>
        <ModalPayment
          show={modalShow}
          onHide={() => setModalShow(false)}
          tablePayment={tablePayment}
          offTables={offTables}
        />
      </Row>
    </div>
  );
}

export default App;
