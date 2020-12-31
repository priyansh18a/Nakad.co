import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import "../Login/Login.scss";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const update = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const register = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("/register", {
        email: form.email,
        password: form.password,
        data: { name: form.name },
      })
      .then((response) => {
        if (response.data.message) {
          const flashMsg = document.getElementById("flash-msg");
          const msg = document.getElementById("msg");
          if (flashMsg == null || msg == null) return;
          flashMsg.style.display = "block";
          msg.innerHTML = "User Already Exist! Please Login";
        } else {
          const flashMsg = document.getElementById("flash-msg2");
          const msg = document.getElementById("msg2");
          if (flashMsg == null || msg == null) return;
          flashMsg.style.display = "block";
          msg.innerHTML = 'Registration Successful. Please <a href="/tier1">Login</a> here.';
        }
      })
      .catch((error) => {
        const flashMsg = document.getElementById("flash-msg");
        const msg = document.getElementById("msg");
        if (flashMsg == null || msg == null) return;
        flashMsg.style.display = "block";
        msg.innerHTML = "Registration Failed! Please Try Again";
        console.log(error);
      });
  };
  const closeflash = () => {
    const flashMsg = document.getElementById("flash-msg");
    const flashMsg2 = document.getElementById("flash-msg2");
    if (flashMsg == null || flashMsg2 == null) return;
    flashMsg.style.display = "none";
    flashMsg2.style.display = "none";
  };

  return (
    <div className="container">
      <p className="title has-text-info">Register</p>
      <div className="tier-1-login">
        <div className="column is-4 is-offset-4">
          <div className="notification is-danger" id="flash-msg">
            <button className="delete" onClick={closeflash}></button>
            <p id="msg"></p>
          </div>
          <div className="notification is-primary" id="flash-msg2">
            <button className="delete" onClick={closeflash}></button>
            <p id="msg2"></p>
          </div>
          <form onSubmit={register}>
            <div className="field">
              <div className="control">
                <label className="label">Name</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={update}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Email</label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={update}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">Password</label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={update}
                  required
                />
              </div>
              <a className="help has-text-left" href="/tier1">
                Forgot Company ID / User ID / Password
              </a>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="buttons">
                <button className="is-info  button " style={{ marginBottom: "15px" }}>
                  Register
                </button>
              </div>
            </div>
          </form>
          <small>
            Already have a account
            <a className="help" href="/tier1" style={{ marginTop: "0px" }}>
              Login here{" "}
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
