import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import Container from "react-bootstrap/esm/Container";

export default function Error() {
  const error = useRouteError() as unknown;

  return (
    <Container className={styles.error}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
