import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "../Tier1Login/Tier1Login.scss";

const Tier2Login = () => {
  const history = useHistory();
  const [form, setForm] = useState({ companyid: "", userid: "", password: "" });
  const update = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const logintier2 = (event: React.FormEvent) => {
    event.preventDefault();
    // const { invoice, password } = event.target.elements;
    history.push("/tier2/early");
  };

  return (
    <div className="container">
      <p className="title has-text-info">Tier 2 Login</p>
      <div className="tier-1-login">
        <div className="column is-4 is-offset-4">
          <form onSubmit={logintier2}>
            <div className="field">
              <div className="control">
                <label className="label">Company ID</label>
                <input
                  className="input"
                  type="text"
                  name="companyid"
                  placeholder="Company ID"
                  value={form.companyid}
                  onChange={update}
                  required
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="label">User ID</label>
                <input
                  className="input"
                  type="text"
                  name="userid"
                  placeholder="User ID"
                  value={form.userid}
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
              <a className="help has-text-left" href="/tier2">
                Forgot Company ID / User ID / Password
              </a>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="buttons">
                <button className="is-info  button " onClick={() => console.log(form)}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tier2Login;
