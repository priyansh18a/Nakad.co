import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import FormData from "form-data";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg";
import "./Tier2Upload.scss";

const Tier2Upload = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    invoice: "",
    payername: "",
    invoicedate: "",
    invoiceamount: 0,
    receivableamount: 0,
    receivabledate: "",
    grn: "",
    invoicefile: "",
    grnfile: "",
  });
  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const [fileurl, setFileurl] = useState([]);
  const [inputList, setInputList] = useState([{ debitNoteNo: "", debitNoteAmount: 0, debitNoteFile: "" }]);
  const [customers, setCustomers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [buttonText, setButtonText] = useState("Send for Approval");
  const dateObj = new Date();
  const currentdate = dateObj.toISOString().split("T")[0];
  const uploadtime =
    dateObj.getFullYear() +
    "-" +
    (dateObj.getMonth() + 1) +
    "-" +
    dateObj.getDate() +
    " " +
    dateObj.getHours() +
    ":" +
    dateObj.getMinutes() +
    ":" +
    dateObj.getSeconds();

  useEffect(() => {
    getcustomers();
  }, []);

  const uploadinvoiceandgrn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post("/api/Tier2Invoice", {
        tier1Id: 1, // TODO(Priyanshu)
        tier2Id: 2, // TODO(Priyanshu)
        invoiceId: form.invoice,
        invoiceAmount: {
          amount: form.invoiceamount * 100, // to provide 2 digit precision
          currency: "INR",
          precision: 2,
        },
        invoiceDate: form.invoicedate,
        dueDate: form.receivabledate,
        grnId: [form.grn],
        approvalStatus: "Pending",
        receivableAmount: { amount: form.receivableamount * 100, currency: "INR", precision: 2 },
        tier2InvoiceDetails: { data: fileurl, debitNotes: inputList },
        creationTimestamp: uploadtime,
        lastUpdateTimestamp: uploadtime,
      })
      .then((response) => {
        console.log(response);
        alert("Your invoice has been uploaded"); // TODO(Priyanshu) need to change this with notification
        history.push("/tier2/early");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    setButtonText("Uploading...");
    const file = event.target.files[0];
    console.log(file);
    const data = new FormData();
    data.append("image", file, file.name);
    axios
      .post("/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUploading(false);
        setButtonText("Send for Approval");
        setFileurl([...fileurl, response.data.fileUrl]);
      })
      .catch((error) => {
        setButtonText("Uploading Failed! Try Again");
        console.log(error);
      });
  };

  const getcustomers = () => {
    axios
      .get("/api/ListTier2Customers?tier2Id=2") // TODO(Priyanshu)
      .then((response) => {
        setCustomers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // handle input change
  const handleDebitNoteNoChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].debitNoteNo = value;
    setInputList(list);
  };

  const handleDebitNoteAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...inputList];
    if (value) list[index].debitNoteAmount = parseInt(value, 10);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index: number) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { debitNoteNo: "", debitNoteAmount: 0, debitNoteFile: "" }]);
  };

  const uploaddebitnotefile = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setUploading(true);
    setButtonText("Uploading...");
    const file = event.target.files[0];
    console.log(file);
    const data = new FormData();
    if (document.getElementById(inputList[index].debitNoteNo))
      document.getElementById(inputList[index].debitNoteNo).textContent = file.name;
    else {
      alert("First Fill Debit Note Number");
    }
    data.append("image", file, file.name);
    axios
      .post("/upload", data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUploading(false);
        setButtonText("Send for Approval");
        const list = [...inputList];
        list[index].debitNoteFile = response.data.fileUrl;
        setInputList(list);
      })
      .catch((error) => {
        setButtonText("Uploading Failed! Try Again");
        console.log(error);
      });
  };

  const calculatereceivedamount = () => {
    let debitnoteamount = 0;
    for (const i of inputList) {
      debitnoteamount -= i.debitNoteAmount;
    }
    const positivevalue = Math.abs(debitnoteamount); // getting some issue in using + to calculate final amount so first positive value and then subtract
    const finalamount = form.invoiceamount - positivevalue;
    setForm({ ...form, receivableamount: finalamount });
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
            <a className="navbar-item this-page" href="/tier2/upload">
              Upload Invoice
            </a>
            <a className="navbar-item" href="/tier2/account">
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
                  <a className="navbar-item">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="main-content">
        <div className="container">
          <p className="title has-text-info tier-2-head">Documents upload</p>
          <div className="tier-2-login" style={{ height: "auto" }}>
            <div className="column is-4 is-offset-4 ">
              <form onSubmit={uploadinvoiceandgrn}>
                <div className="field">
                  <div className="control">
                    <label className="label">Invoice Number</label>
                    <input
                      className="input"
                      type="text"
                      name="invoice"
                      placeholder="Invoice Number"
                      value={form.invoice}
                      onChange={update}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" style={{ float: "left" }}>
                    Customer
                  </label>
                  <div className="control">
                    <div className="select">
                      <select name="payername" onChange={update} required>
                        <option defaultValue="">Select dropdown</option>{" "}
                        {/*    TODO(Priyanshu) Sending this data to backend pending */}
                        {customers.map((element) => (
                          <option value={element.customerActor.name} key={element.customerActor.name}>
                            {element.customerActor.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Invoice Date</label>
                    <input
                      className="input"
                      type="date"
                      max={currentdate}
                      id="invoicedate"
                      name="invoicedate"
                      placeholder="Invoice Date"
                      value={form.invoicedate}
                      onChange={update}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Receivable Date</label>
                    <input
                      className="input"
                      type="date"
                      min={currentdate}
                      id="receivabledate"
                      name="receivabledate"
                      placeholder="Receivable Date"
                      value={form.receivabledate}
                      onChange={update}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">Invoice Amount</label>
                    <input
                      className="input"
                      type="number"
                      name="invoiceamount"
                      placeholder="Amount(in ₹)"
                      value={form.invoiceamount}
                      onChange={update}
                      required
                    />
                  </div>
                </div>
                <div id="file-js-example" className=" field file has-name is-dark">
                  <label className="file-label">
                    <input className="file-input" type="file" name="invoicefile" onChange={uploadfile} required />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Upload Invoice</span>
                    </span>
                    <span className="file-name">No file uploaded</span>
                  </label>
                </div>
                {inputList.map((x, i) => {
                  return (
                    <div>
                      <div className="field">
                        <div className="control">
                          <label className="label">Debit Note Number</label>
                          <input
                            className="input"
                            type="text"
                            name="debitNoteNo"
                            placeholder="Enter Debit Note No."
                            value={x.debitNoteNo}
                            onChange={(e) => handleDebitNoteNoChange(e, i)}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <label className="label">Debit Note Amount</label>
                          <input
                            className="input"
                            type="number"
                            name="debitNoteAmount"
                            placeholder="Enter Debit Note Amount"
                            value={x.debitNoteAmount}
                            onChange={(e) => handleDebitNoteAmountChange(e, i)}
                          />
                        </div>
                      </div>
                      <div className=" field file has-name is-dark">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            name="debitNoteFile"
                            onChange={(e) => uploaddebitnotefile(e, i)}
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">Upload Debit Note</span>
                          </span>
                          <span className="file-name" id={x.debitNoteNo}>
                            No file uploaded
                          </span>
                        </label>
                      </div>
                      <div className="buttons" style={{ marginBottom: "5px" }}>
                        {inputList.length - 1 === i && (
                          <button onClick={handleAddClick} className="is-success button">
                            Add More Debit Note
                          </button>
                        )}
                        {inputList.length !== 1 && (
                          <button className="is-danger button" onClick={() => handleRemoveClick(i)}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div className="field">
                  <div className="control">
                    <label className="label">Receivable Amount</label>
                    <input
                      className="input"
                      type="number"
                      name="receivableamount"
                      placeholder="Receivable Amount(in ₹)"
                      readOnly
                      value={form.receivableamount}
                      required
                      onClick={calculatereceivedamount}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <label className="label">GRN</label>
                    <input
                      className="input"
                      type="text"
                      name="grn"
                      placeholder="GRN #"
                      value={form.grn}
                      onChange={update}
                      required
                    />
                  </div>
                </div>
                <div id="file-js-example2" className=" field file has-name is-dark">
                  <label className="file-label">
                    <input className="file-input" type="file" name="grnfile" onChange={uploadfile} required />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Upload GRN</span>
                    </span>
                    <span className="file-name">No file uploaded</span>
                  </label>
                </div>
                <div className="field is-grouped is-grouped-centered">
                  <div className="buttons">
                    <button className="is-info button is-bold " disabled={uploading}>
                      <strong>{buttonText}</strong>
                    </button>
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

export default Tier2Upload;
