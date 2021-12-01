import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

interface QtyTablesProps {
  qtyTables: number;
}

export const TableStatus = ({ qtyTables }: QtyTablesProps) => {
  return (
    <Container>
      <div>
        <FontAwesomeIcon icon={faSquare} className="text-success me-2" />
        <label className="text-white">โต๊ะว่าง</label>
      </div>
      <div>
        <FontAwesomeIcon icon={faSquare} className="text-danger me-2" />
        <label className="text-white">โต๊ะไม่ว่าง</label>
      </div>
      <h2 className="my-3 text-white">โต๊ะว่าง {qtyTables} โต๊ะ</h2>
    </Container>
  );
};
