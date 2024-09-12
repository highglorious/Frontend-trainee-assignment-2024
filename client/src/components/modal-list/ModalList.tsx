import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { OrderItem } from "../../api/types";
import ItemCard from "../item-card";

type ModalListProps = {
  show: boolean;
  items: OrderItem[];
  handleClose: () => void;
};

export default function ModalList({
  show,
  items,
  handleClose,
}: ModalListProps) {
  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Список товаров</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {items.map(({ id, name, price, imageUrl, views, likes, count }) => (
          <ItemCard
            count={count}
            key={id}
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
            views={views}
            likes={likes}
          />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
