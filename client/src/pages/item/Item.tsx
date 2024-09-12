import { useState } from "react";
import { Advertisment } from "../../api/types";
import { useLoaderData } from "react-router-dom";
import ModalForm from "../../components/modal-form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import { HeartFill } from "react-bootstrap-icons";
import { EyeFill } from "react-bootstrap-icons";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import styles from "./Item.module.css";

type LoaderData = Advertisment;

export default function Item() {
  const { name, price, views, likes, imageUrl, description } =
    useLoaderData() as LoaderData;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ModalForm
        title={"Редактировать обьявление"}
        btnText={"Сохранить"}
        show={show}
        handleClose={handleClose}
        name={name}
        price={price}
        imageUrl={imageUrl}
        description={description}
      />
      <Container>
        <Card className={styles.card}>
          <Card.Header>
            <Card.Title>{name}</Card.Title>
          </Card.Header>
          <Card.Img src={imageUrl} />
          <Card.Body>
            <Row>
              <Col>
                <Card.Text className="mb-2 text-muted">
                  {price?.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                </Card.Text>
              </Col>
              <Col>
                <Card.Text>
                  <EyeFill /> {views}
                </Card.Text>
              </Col>
              <Col>
                <Card.Text>
                  <HeartFill /> {likes}
                </Card.Text>
              </Col>
            </Row>
            <Card.Subtitle>Описание</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Button variant="primary" onClick={handleShow}>
              Изменить
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
