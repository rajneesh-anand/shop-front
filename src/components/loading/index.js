import { Spinner } from "react-bootstrap";
import { MessageBox } from "../messagebox";

export default function Loading() {
  return (
    <div className="text-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
