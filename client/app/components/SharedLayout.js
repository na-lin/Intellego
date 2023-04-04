import React from "react";

// React Router
import { Outlet } from "react-router-dom";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import { Sidebar } from "../components";

const SharedLayout = () => {
  return (
    <Container>
      <Row>
        <Col xs={3} id="sidebar-wrapper">
          <Sidebar />
        </Col>
        <Col xs={9} id="page-content-wrapper">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default SharedLayout;
