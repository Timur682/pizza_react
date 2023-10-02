import AuthContext from "../contexts/AuthContext";
import {useContext, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Loading from "../components/Spinner";
import authService from "../services/auth.service";
import Swal from "sweetalert2";

const Register = () => {
    const nav = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(undefined);

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
        //get data from input fields:
        const { email, username, password } = formValues;
        //submit Post request
        authService
            .register(email, username, password)
            .then((res) => {
                //success:
                console.log(res)
                //Sweet Alert
                Swal.fire({
                    title:res.data.message,
                    icon:"success",
                    timer: 1500
                })
                //Go to Login page:
                nav('/login')
            })
            .catch((e) => {
                console.log(e)
                setErrorMessage(e.response.data.detail);
            })
            .finally(()=>{
                setIsLoading(false)
                //setErrorMessage(undefined)
            });
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleRegister}
            validationSchema={validationSchema}
        >
            <Form>
                {isLoading && < Loading text="Logging you in..."/>}

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
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    {/* Input Tag */}
                    <Field name="email" type="email" id="email" />
                    {/* Error message for the input */}
                    <ErrorMessage
                        component="div"
                        name="email"
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
                    <button disabled={isLoading} type ="submit" className="btn btn-primary">Register</button>
                </div>
            </Form>
        </Formik>)

};
export default Register;