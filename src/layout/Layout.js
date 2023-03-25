import Header from "./Header";
import Footer from "./Footer";
import Navigation from "./Navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Layout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Header />
      </Row>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <div>{children}</div>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default Layout;
