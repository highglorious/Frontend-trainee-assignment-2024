import type { OrderItem } from "../../api/types";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { EyeFill, HeartFill } from "react-bootstrap-icons";
import styles from "./ItemCard.module.css";

type ItemCardProps = Omit<OrderItem, "createdAt" | "description" | "count"> &
  Partial<Pick<OrderItem, "count">>;

export default function ItemCard({
  id,
  name,
  price,
  imageUrl,
  views,
  likes,
  count,
}: ItemCardProps) {
  return (
    <Link to={`/adverts/${id}`} className="link-nodecor">
      <Card className={styles.card}>
        <Row>
          <Col md={3}>
            <Card.Img src={imageUrl} />
          </Col>
          <Col md={5}>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>
                {price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </Card.Subtitle>
              {count && <Card.Text>Количество: {count}</Card.Text>}
            </Card.Body>
          </Col>
          <Col md={4}>
            <Card.Body>
              <Card.Text>
                <EyeFill /> {views}
              </Card.Text>
              <Card.Text>
                <HeartFill /> {likes}
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Link>
  );
}
