import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import authService from "../services/auth.service";
import TextField from '@mui/material/TextField';
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

  //Validations:
  const validationSchema = Yup.object({
    username: Yup.string().min(2).required(),
    password: Yup.string().min(4).required(),
  });

  //will be called by formik if the form is VALID
  const handleLogin = (formValues) => {
    setisLoading(true);
    //get data from input fields:
    const { username, password } = formValues;

    //submit Post request
    authService
      .login(username, password)
      .then((res) => {
        //save the JWT for next time:
        login(username, res.token);
        //Go to Home page:
        nav("/");
      })
      .catch((e) => {
        console.log(e);
        seterrorMessage(JSON.stringify(e));
      })
      .finally(() => {
        setisLoading(false);
        //seterrorMessage(undefined)
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
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
        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          {/* Input Tag */}
          <Field name="username" type="text" id="username" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="username"
            className="alert alert-danger"
          />
        </div>

        <div className="form-group">
          {/* Label that describes an input */}
          <label htmlFor="password" className="form-label">
            Password
          </label>
          {/* Input Tag */}
          <Field name="password" type="password" id="password" />
          {/* Error message for the input */}
          <ErrorMessage
            component="div"
            name="password"
            className="alert alert-danger"
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
  );
};

export default Login;