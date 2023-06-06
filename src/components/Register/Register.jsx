import React, { useState } from "react";
import axios from "axios";
import "../Login/Login.css";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "user",
    otp: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [showOTPInput, setShowOTPInput] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/register`,
        { ...formData, recaptchaToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response ", response.data);
      setErrorMessage("");
      setShowOTPInput(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setErrorMessage("");
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/verify-otp`,
        { otp: formData.otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response ", response.data);
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login_form">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
            </label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

              <ReCAPTCHA
              sitekey="6LeqKWQmAAAAAO0O9Pr2p4tVBaVQgJSZ4fgmh_4I"
              onChange={handleRecaptchaChange}
            />


<button type="submit" className="registerbtn btn btn-dark mb-3">
            Register
          </button>

          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>

        {showOTPInput && (
          <form className="login-form" onSubmit={handleOTPSubmit}>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                name="otp"
                className="form-control"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
            </div>

            <button type="submit" className="verifybtn btn btn-dark mb-3">
              Verify OTP
            </button>

            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
