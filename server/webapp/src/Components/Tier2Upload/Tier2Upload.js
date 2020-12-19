import React, { useState} from 'react';
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
                                ]}
          })
          .then(function (response) {
            console.log(response);
            history.push("/tier2/early");
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const uploadtier2invoice = event => {
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
            console.log("Upload Successful");
            setInvoiceurl(response.data.fileUrl);     
        })
        .catch(function (error) {
            console.log(error);
        })

    }

    const uploadtier2grn = event => {
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
            alert("Upload Successful");
            setGrnurl(response.data.fileUrl);     
        })
        .catch(function (error) {
            console.log(error);
        })

    }
    return (
    <div>
    <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img src={logo} width="150"  alt="" />
        </a>
    
        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <a class="navbar-item" href="/tier2/early">
                Early Payment 
                </a>
                <a class="navbar-item" href="/tier2/consolidated">
                Consolidated View
                </a>
                <a class="navbar-item" href="/tier2/upload">
                Upload Invoice
                </a>
                <a className="navbar-item" href="/tier2/account">
                Account 
                </a>
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary is-light">
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
                        <label className="label">Invoice</label>
                        <input className="input" type="text" name="invoice" placeholder="Invoice Number" value={form.invoice} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Payer</label>
                        <input className="input" type="text" name="payername" placeholder="Payer Name"  value={form.payername} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Invoice Date</label>
                        <input className="input" type="date" name="invoicedate" placeholder="Invoice Date"  value={form.invoicedate} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Receivable Date</label>
                        <input className="input" type="date" name="receivabledate" placeholder="Receivable Date"  value={form.receivabledate} onChange={update} required/>
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
                <div id="file-js-example" class=" field file has-name is-dark">
                    <label class="file-label">
                        <input class="file-input" type="file" name="invoicefile" onChange={uploadtier2invoice}/>
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Upload Invoice
                        </span>
                        </span>
                        <span class="file-name">
                        No file uploaded
                        </span>
                    </label>
                </div>
                <div id="file-js-example2" class=" field file has-name is-dark">
                    <label class="file-label">
                        <input class="file-input" type="file" name="grnfile" onChange={uploadtier2grn}/>
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Upload GRN
                        </span>
                        </span>
                        <span class="file-name">
                        No file uploaded
                        </span>
                    </label>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <div className="buttons">
                        <button className="is-info button is-bold "><strong>Send for Approval</strong></button>
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