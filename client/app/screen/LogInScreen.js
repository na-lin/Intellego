import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  Button,
  Toast,
  Modal,
  ToastContainer,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useFormik, Formik, Field } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthState,
  login,
  clearAttempt,
  getUserInfo,
} from "../store/slices/authSlice";
import LoadingSpinner from "../components/LoadingSpinner";

const LogInScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user, error } = useSelector(selectAuthState);
  const [visible, setVisible] = useState(false);

  // state related to verify student ID
  const [showToast, setShowToast] = useState(false);

  const validate = yup.object().shape({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Enter 6 or more characters")
      .required("Password is required"),
  });

  useEffect(() => {
    if (user) {
      setShowToast(true);
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setVisible(true);
    }
  }, [error]);

  function handleCloseModal() {
    dispatch(clearAttempt());
    setVisible(false);
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
    <>
      <ToastContainer position="top-center">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <span>Intellego</span>
          </Toast.Header>
          <Toast.Body>
            Welcome Back! {`${user?.firstName} ${user?.lastName}`}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <Container id="loginContainer">
        <Row>
          <h4>Log in to your account</h4>
        </Row>
        <Row>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validate}
            onSubmit={(values) => dispatch(login(values))}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit} id="loginForm">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={errors.email && touched.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password && touched.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Button
                    type="submit"
                    style={{ width: "100%", marginTop: "20px" }}
                    className="orangeButton"
                  >
                    Log in
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Row>
        <Row>
          <Button
            className="blueButton"
            style={{ width: "18.375em", marginTop: "20px" }}
            onClick={handleDemoLogin}
          >
            Login as Demo User
          </Button>
        </Row>
        <Row>
          <p style={{ fontSize: "10px", marginTop: "20px" }}>
            Don't have an account? <Link to="/signup">Sign up for free</Link>
          </p>
        </Row>
      </Container>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={visible}
        onHide={handleCloseModal}
      >
        <Modal.Header>
          <Modal.Title> Log In Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an issue logging in. Please check your username and password
          and try again!
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LogInScreen;
