import React, { useState, useEffect } from "react";
import "./Style.css";
import axios from 'axios';
import { Link } from "react-router-dom";

function Login() {
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErr, setFormErr] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/login', {
                email: formValues.email,
                password: formValues.password
            });
            console.log('Login Successful:', res.data);
            setLoginError(null); 
            setFormValues(initialValues); 
        } catch (error) {
            console.error('Login Error:', error.response.data);
            setLoginError(error.response.data.message);
        }

        setFormErr(validate(formValues));
        setSubmit(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (Object.keys(formErr).length === 0 && isSubmit) {
            console.log("No form errors");
        }
    }, [formErr, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!values.email) {
            errors.email = "This field is mandatory so you must fill it.";
        } else if (!regex.test(values.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!values.password) {
            errors.password = "This field is mandatory so you must fill it.";
        } else if (values.password.length < 4) {
            errors.password = "Your password must have at least 4 characters.";
        } else if (values.password.length > 10) {
            errors.password = "Your password must not exceed 10 characters.";
        }

        return errors;
    };

    return (
        <section className="form">
            <div className="form-part login">
                <form action="/login" method="POST" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {loginError && <div className="error">{loginError}</div>}
                    {Object.keys(formErr).length === 0 && isSubmit && (
                        <div className="success">Login Successfully</div>
                    )}
                    <div className="fields">
                        <label htmlFor="email">Email</label><br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email Address"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <span>{formErr.email}</span>

                    <div className="fields">
                        <label htmlFor="password">Password</label><br />
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter your Password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <span>{formErr.password}</span>

                    <div className="checkbox">
                        <input type="checkbox" onClick={togglePasswordVisibility} />
                        <label> {showPassword ? "Hide Password" : "Show Password"}</label>
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                    <div className="content-part">
                        <p>You don't have an account  <Link to="/Signup">Signup</Link> </p>
                    </div>
                    <div>
                        <button ><Link to="/Profile"> Login & Save Profile</Link></button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;
