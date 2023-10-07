import AuthContext from "../contexts/AuthContext";
import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Loading from "../components/Spinner";
import authService from "../services/auth.service";
import Swal from "sweetalert2";
import './Login.scss'; 

const Register = () => {
    const nav = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [setErrorMessage] = useState(undefined);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .min(2, "Username must be at least 2 characters")
            .matches(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
            .required("Username is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6).required("Password is required"),
    });

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    const handleRegister = (formValues) => {
        setIsLoading(true);
        const { email, username, password } = formValues;

        authService
            .register(email, username, password)
            .then((res) => {
                console.log(res)
                Swal.fire({
                    title:res.data.message,
                    icon:"success",
                    timer: 1500
                })
                nav('/login')
            })
            .catch((e) => {
                console.log(e);
                setErrorMessage("An error occurred during registration, please try again later");
                Swal.fire({
                    title: "Error",
                    text: "An error occurred during registration, please try again later",
                    icon: "error",
                    confirmButtonText: "Ok"
                });
            })
            .finally(() => {
                setIsLoading(false)
            });
    };

    return (
        <div className="register-form mx-auto">
            <Formik
                initialValues={initialValues}
                onSubmit={handleRegister}
                validationSchema={validationSchema}
            >
                <Form>
                    {isLoading && < Loading text="Logging you in..."/>}
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
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <Field name="email" type="email" id="email" className="form-control" />
                        <ErrorMessage
                            component="div"
                            name="email"
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
                        <button disabled={isLoading} type ="submit" className="btn btn-primary">Register</button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Register;
