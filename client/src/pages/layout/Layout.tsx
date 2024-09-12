import { NavLink, Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="px-8">Личный кабинет</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink className="link-nodecor" to="/adverts">
              {({ isActive }) => (
                <Nav.Link as="section" active={isActive}>
                  Обьявления
                </Nav.Link>
              )}
            </NavLink>
            <NavLink className="link-nodecor" to="/orders">
              {({ isActive }) => (
                <Nav.Link as="section" active={isActive}>
                  Заказы
                </Nav.Link>
              )}
            </NavLink>

            {/* <Nav.Link href="#link">Заказы</Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
