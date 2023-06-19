import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [, setLoading] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      const data = await response.json();
      if (response.ok) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("Role", data.role);
        sessionStorage.setItem("fullName", data.fullName);
        sessionStorage.setItem("email", data.email);

        swal({
          title: "Login successful",
          icon: "success",
         
        }).then(() => {
          if (data.role === "admin") {
            window.location.href = "/Admin/Home";
          } else if (data.role === "user") {
          }
        });
      } else {
        swal({
          title: "Login failed",
          text: data.message,
          icon: "error",
        });
      }
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) sessionStorage.removeItem("token");
  });

  return (
    <div className="login-page">
      <div className="login_form">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>login</button>
          {error && <p className="error">{error}</p>}
          <p className="message">
            Not registered?{" "}
            <a href="/register" >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;