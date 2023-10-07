import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import authService from "../services/auth.service";
import swal from 'sweetalert';
import './Login.scss'; 

const Login = () => {
  const nav = useNavigate();
  const { isLoggedIn, login } = useContext(AuthContext);

  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState(undefined);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    password: Yup.string().min(4).required(),
  });

  const handleLogin = (formValues) => {
    setisLoading(true);
    const { username, password } = formValues;

    authService
      .login(username, password)
      .then((res) => {
        login(username, res.token);
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        seterrorMessage("An error occurred during login, please try again later");
        swal("Error", "An error occurred during login, please try again later", "error");
      })      
      .finally(() => {
        setisLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-form mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form>
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {isLoading && <Spinner text="Logging you in..." />}
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <Field name="username" type="text" id="username" className="form-control" />
            <ErrorMessage
              component="div"
              name="username"
              className="alert alert-danger mt-2"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field name="password" type="password" id="password" className="form-control" />
            <ErrorMessage
              component="div"
              name="password"
              className="alert alert-danger mt-2"
            />
          </div>

          <div className="col-12">
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
