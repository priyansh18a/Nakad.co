import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg";
import "../Tier2Upload/Tier2Upload.scss";

const Tier2Account = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    accountname: "",
    accountnum: "",
    confirmaccountnum: "",
    ifsccode: "",
    bankname: "",
    branchname: "",
  });
  const update = (event: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });

  const uploaddetail = (event: any) => {
    event.preventDefault();
    // const { accountname , accountnum } = event.target.elements;
    history.push("/tier2/upload");
  };

  const logout = () => {
    axios
      .get("/logout")
      .then((response) => {
        // handle success
        history.push("/");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Nakad} height="37" alt="" className="main-logo" />
          </a>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-center">
            <a className="navbar-item " href="/tier2/early">
              Early Payment
            </a>
            <a className="navbar-item " href="/tier2/consolidated">
              Consolidated View
            </a>
            <a className="navbar-item " href="/tier2/upload">
              Upload Invoice
            </a>
            <a className="navbar-item this-page" href="/tier2/account">
              Account
            </a>
          </div>
          <div className="navbar-right">
            <img src={Support} alt="" width="16px" className="support" />
            <img src={Notification} alt="" width="20px" />
            <div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <p className="name-full">Kamal enterprise</p> {/* Need to make this dynamic */}
                  <div className="name-first">
                    <p>K</p>
                  </div>
                </a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Profile</a>
                  <a className="navbar-item">Settings</a>
                  <a className="navbar-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="main-content">
      <div className="container">
        <p className="title has-text-info tier-2-head">Tier 2 Account details</p>
        <div className="tier-2-login">
          <div className="column is-4 is-offset-4">
            <form onSubmit={uploaddetail}>
              <div className="field">
                <div className="control">
                  <label className="label">Account Name</label>
                  <input
                    className="input"
                    type="text"
                    name="accountname"
                    placeholder="Account Holder Name"
                    value={form.accountname}
                    onChange={update}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Account Number</label>
                  <input
                    className="input"
                    type="password"
                    name="accountnum"
                    placeholder="Bank Account Number"
                    value={form.accountnum}
                    onChange={update}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Confirm Account Number</label>
                  <input
                    className="input"
                    type="password"
                    name="confirmaccountnum"
                    placeholder="Confirm Account Number"
                    value={form.confirmaccountnum}
                    onChange={update}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">IFSC Code</label>
                  <input
                    className="input"
                    type="text"
                    name="ifsccode"
                    placeholder="Bank IFSC code"
                    value={form.ifsccode}
                    onChange={update}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Bank Name</label>
                  <input
                    className="input"
                    type="text"
                    name="bankname"
                    placeholder="Bank Name"
                    value={form.bankname}
                    onChange={update}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Branch Name</label>
                  <input
                    className="input"
                    type="text"
                    name="branchname"
                    placeholder="Branch Name"
                    value={form.branchname}
                    onChange={update}
                    required
                  />
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <div className="buttons">
                    <button className="is-info  button ">Upload</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tier2Account;
