//react
import React from "react";

// React router
import { Link, Navigate } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuthState } from "../store/slices/authSlice";

// components
import { LoadingSpinner } from "../components";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(selectAuthState);

  // Navigate user to dashboard if user login as demo user.
  if (user) {
    return <Navigate to="/" />;
  }

  // User login as demo user.
  const handleDemoLogin = () => {
    dispatch(
      login({
        email: "kara@email.com",
        password: "123123",
      })
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="landingContainer">
      <Row>
        <Col className="left_slide">
          <h3>
            <img src="/assets/Logo.png" alt="logo" style={{ width: "30px" }} />{" "}
            Welcome to Intellego
          </h3>
          <br />
          <p>
            The dashboard for teachers who want more from their grading
            platform. Intellego offers teachers the tools to create, send and
            grade formative student assessments.
          </p>
          <br />
          <Button
            as={Link}
            to="/login"
            className="orangeButton"
            style={{ width: "70%" }}
          >
            Log in
          </Button>

          <Button
            as={Link}
            to="/signup"
            className="orangeButton"
            style={{ width: "70%", marginTop: "20px" }}
          >
            Sign up
          </Button>
          <Button
            className="blueButton"
            style={{ width: "70%", marginTop: "20px" }}
            onClick={handleDemoLogin}
          >
            Login as Demo User
          </Button>
        </Col>
        <Col className="right_slide">
          <img src={"/assets/landing_test_image.png"} alt="landing page" />
        </Col>
      </Row>
    </Container>
  );
};
export default HomeScreen;
