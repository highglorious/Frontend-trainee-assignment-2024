import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Order, orderStatusKV } from "../../api/types";

type OrderCardProps = {
  showItems: (id: string) => void;
} & Omit<Order, "">;

export default function OrderCard({
  id,
  status,
  total,
  createdAt,
  deliveryWay,
  items,
  showItems,
}: OrderCardProps) {
  let count = 0;
  for (const item of items) {
    count += item.count;
  }

  return (
    <Card className="p-2" style={{ width: "38rem" }}>
      <Card.Body>
        <Card.Title>
          Заказ {id} от {new Date(createdAt).toLocaleDateString("ru-RU")}
        </Card.Title>
        <Card.Text> Всего товаров: {count}</Card.Text>
        <Card.Text>Стоимость {total}</Card.Text>
        <Card.Text>Статус заказа: {orderStatusKV[status]}</Card.Text>
        <Card.Text> Доставк осуществляет: {deliveryWay}</Card.Text>
        <Button variant="primary" onClick={() => showItems(id)}>
          Показать все товары
        </Button>
      </Card.Body>
    </Card>
  );
}
