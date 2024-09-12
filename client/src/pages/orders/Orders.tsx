import OrderCard from "../../components/order-card";

import { useLoaderData, useSearchParams } from "react-router-dom";
import { Order, OrderStatus } from "../../api/types";
import Stack from "react-bootstrap/esm/Stack";

import Form from "react-bootstrap/Form";
import { useMemo, useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ModalList from "../../components/modal-list";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

type LoaderData = Order[];

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState<string>();

  const handleClose = () => setShow(false);
  const handleShow = (id: string) => {
    setOrderId(id);
    console.log("ID=", id);

    setShow(true);
  };

  const orders = useLoaderData() as LoaderData;

  const ref = useRef<HTMLInputElement[]>([]);

  const checks = Object.entries(OrderStatus).map(([status, value], i) => (
    <Form.Check
      key={i}
      ref={(element: HTMLInputElement) => {
        ref.current[i] = element;
      }}
      type="checkbox"
      label={status}
      value={value}
      id="id1"
      onChange={(e) => {
        const params = new URLSearchParams(searchParams);
        params.append("status", "" + value);
        setSearchParams(`?${params.toString()}`);
        e.target.disabled = true;
      }}
    />
  ));

  const foundOrder = useMemo(
    () => orders.find((order) => order["id"] === orderId)?.items,
    [orderId, orders]
  );

  return (
    <>
      {foundOrder && (
        <ModalList show={show} items={foundOrder} handleClose={handleClose} />
      )}
      <Row md="auto">
        <Col md={4}>
          <Stack>{checks}</Stack>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              for (const r of ref.current) {
                r.disabled = false;
                r.checked = false;
                const params = new URLSearchParams(searchParams);
                params.delete("status");
                setSearchParams(`?${params.toString()}`);
              }
            }}
          >
            Сбросить фильтр
          </Button>
        </Col>
        <Col>
          <Form.Select
            defaultValue="unsorted"
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value === "unsorted") {
                params.delete("_sort");
                params.delete("_order");
              } else {
                params.set("_sort", "total");
                params.set("_order", e.target.value);
              }
              setSearchParams(`?${params.toString()}`);
            }}
          >
            <option value="unsorted">Без сортировки</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </Form.Select>
        </Col>
      </Row>

      <Stack gap={3}>
        {orders.map(({ id, status, total, createdAt, deliveryWay, items }) => (
          <OrderCard
            key={id}
            id={id}
            status={status}
            total={total}
            createdAt={createdAt}
            deliveryWay={deliveryWay}
            items={items}
            showItems={handleShow}
          />
        ))}
      </Stack>
    </>
  );
}
