import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

interface QtyTableProps {
  qtyTable: number;
}

export const TableStatus = ({ qtyTable }: QtyTableProps) => {
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
      <h2 className="my-3 text-white">โต๊ะว่าง {qtyTable} โต๊ะ</h2>
    </Container>
  );
};
