import ItemCard from "../../components/item-card/ItemCard";
import { LinkHeaderProps } from "../../api/types";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import { Advertisment } from "../../api/types";
import BForm from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useEffect, useRef, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import ModalForm from "../../components/modal-form/ModalForm";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import styles from "./Items.module.css";

type LoaderData = {
  pagination: LinkHeaderProps;
  nameLike: string;
  limit: string;
  items: Advertisment[];
};

export default function Adverts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const ref = useRef<string>();

  const { items, nameLike, limit, pagination } = useLoaderData() as LoaderData;

  const [lim, setLim] = useState(limit);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const input = document.getElementById(
      "SearchForm.ControlInput1"
    ) as HTMLInputElement;
    input.value = nameLike;
  }, [nameLike]);

  useEffect(() => {
    setLim(limit);
  }, [limit]);

  function appendSearchParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.append(key, value);
    return `?${params.toString()}`;
  }

  return (
    <>
      <ModalForm
        title={"Новое обьявление"}
        btnText={"Добавить"}
        show={show}
        handleClose={handleClose}
      />
      <Pagination className={styles.pagination}>
        <Pagination.First
          disabled={!pagination.prev}
          onClick={() => navigate(pagination.first!)}
        />
        <Pagination.Prev
          disabled={!pagination.prev}
          onClick={() => navigate(pagination.prev!)}
        />
        <Pagination.Item active>
          {new URLSearchParams(searchParams).get("_page")}
        </Pagination.Item>
        <Pagination.Next
          disabled={!pagination.next}
          onClick={() => navigate(pagination.next!)}
        />
        <Pagination.Last
          disabled={!pagination.next}
          onClick={() => navigate(pagination.last!)}
        />
      </Pagination>
      <Container>
        <Row md="auto">
          <Col md={6}>
            <BForm>
              <Row>
                <Col md={8} className="px-0">
                  <BForm.Group
                    className="mb-3"
                    controlId="SearchForm.ControlInput1"
                  >
                    <BForm.Control
                      defaultValue={nameLike ? nameLike : ""}
                      type="text"
                      placeholder=""
                      onChange={(e) => {
                        ref.current = appendSearchParams(
                          "name_like",
                          e.target.value
                        );
                      }}
                    />
                  </BForm.Group>
                </Col>
                <Col md={1}>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchParams(ref.current);
                    }}
                  >
                    Найти
                  </Button>
                </Col>
              </Row>
            </BForm>
          </Col>
          <Col>
            <Button variant="primary" onClick={handleShow}>
              Новое обьявление
            </Button>
          </Col>
          <Col md={1}>
            <BForm.Select
              value={lim}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("_page", "1");
                params.set("_limit", e.target.value);
                setSearchParams(`?${params.toString()}`);
                setLim(e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </BForm.Select>
          </Col>
        </Row>
      </Container>
      <Stack gap={3}>
        {items.map(({ id, name, price, imageUrl, views, likes }) => (
          <ItemCard
            key={id}
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl}
            views={views}
            likes={likes}
          />
        ))}
      </Stack>
    </>
  );
}
