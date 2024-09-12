import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Form as ActionForm } from "react-router-dom";
import { Advertisment } from "../../api/types";

type ModalFormProps = {
  title: string;
  btnText: string;
  show: boolean;

  handleClose: () => void;
} & Partial<Omit<Advertisment, "id" | "likes" | "views" | "createdAt">>;

export default function ModalForm({
  title,
  btnText,
  show,
  handleClose,
  name = "",
  price = 0,
  imageUrl = "",
  description = "",
}: ModalFormProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ActionForm method="post" id="add-item-form">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>URL картинки</Form.Label>
            <Form.Control
              name="imageUrl"
              type="text"
              autoFocus
              defaultValue={imageUrl}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Название*</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              defaultValue={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              name="description"
              as="textarea"
              rows={3}
              defaultValue={description}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Стоимость*</Form.Label>
            <Form.Control
              required
              name="price"
              type="number"
              max={1000000000}
              min={1}
              defaultValue={price}
            />
          </Form.Group>
        </ActionForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button
          form="add-item-form"
          type="submit"
          variant="primary"
          onClick={() => {
            const form = document.getElementById(
              "add-item-form"
            ) as HTMLFormElement;
            if (form.checkValidity()) {
              handleClose();
            }
          }}
        >
          {btnText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
