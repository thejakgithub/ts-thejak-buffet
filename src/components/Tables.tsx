import "./Tables.css";
import { FC } from "react";
import { Button, Container } from "react-bootstrap";
import { NumberTablesProps } from "../interfaces/numberTablesProps";

interface Props {
  numberTables: NumberTablesProps["numberTables"];
  onTables: Function;
  onPayment: Function;
}

export const Tables: FC<Props> = ({ numberTables, onTables, onPayment }) => {
  return (
    <Container>
      <div className="tables__container">
        {numberTables.map((theTable) => {
          return theTable.color === "danger" ? (
            <Button
              key={theTable.no}
              onClick={() => onPayment(theTable.no)}
              variant="danger"
              className="tables__btn "
            >
              {theTable.no}
            </Button>
          ) : (
            <Button
              key={theTable.no}
              onClick={() => onTables(theTable.no)}
              variant="success"
              className="tables__btn "
            >
              {theTable.no}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};
