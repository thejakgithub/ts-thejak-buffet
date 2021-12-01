import { useState } from "react";
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

  const [qtyTable, setQtyTable] = useState<number>(() => {
    const saveQtyTable = localStorage.getItem("qtyTable");

    if (saveQtyTable) {
      return JSON.parse(saveQtyTable);
    } else {
      return 8;
    }
  });

  const onTables = (no: number) => {
    const newNumberTables = numberTables;
    newNumberTables.forEach((numberTable) => {
      if (numberTable.no === no) numberTable.color = "danger";
      setQtyTable(qtyTable - 1);
    });
    setNumberTables([...newNumberTables]);
  };

  const offTables = (no: number) => {
    const newNumberTables = numberTables;
    newNumberTables.forEach((numberTable) => {
      if (numberTable.no === no) numberTable.color = "success";
      setQtyTable(qtyTable + 1);
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
          <TableStatus qtyTable={qtyTable} />
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
