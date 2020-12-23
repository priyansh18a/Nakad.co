import React, { useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import FormData from 'form-data'
import logo from './../../Graphics/logo.jpg';

import "./Tier2Upload.scss"

const Tier2Upload =  () => {
    const history = useHistory(); 
    const [form, setForm] = useState({invoice: '',payername: '', invoicedate: '', invoiceamount: '' , receivableamount: '' , receivabledate: '' , grn: '' , invoicefile: '', grnfile: '' }); // 
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }));
    const [invoiceurl, setInvoiceurl] = useState('');
    const [grnurl, setGrnurl] = useState('');
    const [customers, setCustomers] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [buttonText, setButtonText] = useState('Send for Approval');
    const dateObj = new Date();
    const currentdate = dateObj.toISOString().split("T")[0]
    const uploadtime = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()+ " " +  dateObj.getHours() + ':' + dateObj.getMinutes() + ':' + dateObj.getSeconds();

    useEffect(() => { getcustomers() }, [] );

    const uploadinvoiceandgrn =  event => {
        event.preventDefault();
        axios.post("/api/Tier2Invoice", {   
            tier1Id: 1,     // TODO(Priyanshu)
            tier2Id: 2,      // TODO(Priyanshu)
            invoiceId: form.invoice,
            invoiceAmount : { amount : parseInt(form.invoiceamount)*100, //to provide 2 digit precision
                              currency: "INR",
                              precision: 2
                            },
            invoiceDate: form.invoicedate,
            dueDate: form.receivabledate,
            grnId: [form.grn],
            approvalStatus:  "Pending",
            receivableAmount: { amount:  parseInt(form.receivableamount)*100,
                                currency:"INR",
                                precision: 2
                              },
            tier2InvoiceDetails:{  data: [  
                                   invoiceurl, grnurl   
                                ]},
            creationTimestamp: uploadtime,
            lastUpdateTimestamp:uploadtime
          })
          .then(function (response) {
            console.log(response);
            alert("Your invoice has been uploaded") //TODO(Priyanshu) need to change this with notification
            history.push("/tier2/early");
          })
          .catch(function (error) {
            console.log(error);
          });
    }

   


    const uploadtier2invoice = event => {
        setUploading(true);
        setButtonText("Uploading...")
        const file = event.target.files[0];
        console.log(file);
        const data = new FormData();
        data.append('image', file, file.fileName);
        axios.post("/upload", data,  {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
          }) 
        .then(function (response){
            setUploading(false);
            setButtonText("Send for Approval");
            setInvoiceurl(response.data.fileUrl);     
        })
        .catch(function (error) {
            setButtonText("Uploading Failed! Try Again");
            console.log(error);
        })

    }

    const uploadtier2grn = event => {
        setUploading(true);
        setButtonText("Uploading...")
        const file = event.target.files[0];
        console.log(file);
        const data = new FormData();
        data.append('image', file, file.fileName);
        axios.post("/upload", data,  {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            }
          }) 
        .then(function (response){
            // alert("Upload Successful");
            setUploading(false);
            setButtonText("Send for Approval");
            setGrnurl(response.data.fileUrl);     
        })
        .catch(function (error) {
            setUploading(false);
            setButtonText("Uploading Failed");
            console.log(error);
        })

    }

    const getcustomers = () => {
        axios.get("/api/ListTier2Customers?tier2Id=2")  //TODO(Priyanshu)
        .then(function (response){
            setCustomers(response.data);  
            console.log(response.data)  ;
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    return (
    <div>
    <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <a className="navbar-item" href="/">
            <img src={logo} width="150"  alt="" />
        </a>
    
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>
    
        <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
                <a className="navbar-item" href="/tier2/early">
                Early Payment 
                </a>
                <a className="navbar-item" href="/tier2/consolidated">
                Consolidated View
                </a>
                <a className="navbar-item" href="/tier2/upload">
                Upload Invoice
                </a>
                <a className="navbar-item" href="/tier2/account">
                Account 
                </a>
                <div className="navbar-item">
                    <div className="buttons">
                        <a className="button is-primary is-light">
                            Log Out
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <div className="container">
     <p className="title has-text-info tier-2-head">Kamal enterprise Invoice and GRN upload</p>
    <div className="tier-2-login" style={{ height:"auto"}}>
            <div className="column is-4 is-offset-4 ">
            <form onSubmit={uploadinvoiceandgrn}> 
                <div className="field">
                    <div className="control">
                        <label className="label">Invoice Number</label>
                        <input className="input" type="text" name="invoice" placeholder="Invoice Number" value={form.invoice} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <label className="label" style={{float:"left"}}>Customer</label>
                    <div className="control">
                        <div className="select">
                        <select name="payername" onChange={update} required>
                            <option defaultValue>Select dropdown</option>
                            {customers.map(element => (<option value={element.customerActor.name} key={element.customerActor.name}>{element.customerActor.name}</option>))}
                        </select>
                    </div>
                </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Invoice Date</label>
                        <input className="input" type="date" max={currentdate} id="invoicedate" name="invoicedate" placeholder="Invoice Date"  value={form.invoicedate} onChange={update} required />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Receivable Date</label>
                        <input className="input" type="date" min={currentdate} id="receivabledate" name="receivabledate" placeholder="Receivable Date"  value={form.receivabledate} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Invoice Amount</label>
                        <input className="input" type="number" name="invoiceamount" placeholder="Amount(in ₹)" value={form.invoiceamount} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Receivable Amount</label>
                        <input className="input" type="number" name="receivableamount" placeholder="Receivable Amount(in ₹)" value={form.receivableamount} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">GRN</label>
                        <input className="input" type="text" name="grn" placeholder="GRN #" value={form.grn} onChange={update} required/>
                    </div>
                </div> 
                <div id="file-js-example" className=" field file has-name is-dark">
                    <label className="file-label">
                        <input className="file-input" type="file" name="invoicefile" onChange={uploadtier2invoice}  required/>
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Upload Invoice
                        </span>
                        </span>
                        <span className="file-name">
                        No file uploaded
                        </span>
                    </label>
                </div>
                <div id="file-js-example2" className=" field file has-name is-dark">
                    <label className="file-label">
                        <input className="file-input" type="file" name="grnfile" onChange={uploadtier2grn} required/>
                        <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                            Upload GRN
                        </span>
                        </span>
                        <span className="file-name">
                        No file uploaded
                        </span>
                    </label>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="buttons">
                        <button className="is-info button is-bold " disabled={uploading}><strong>{buttonText}</strong></button>
                    </div>
                </div>
                </form>
                </div>
               
            </div>
    </div>
    </div>
        
    )

};

export default Tier2Upload;