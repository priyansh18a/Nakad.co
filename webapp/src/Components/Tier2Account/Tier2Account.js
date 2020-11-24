import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import logo from './../../Graphics/logo.jpg';
import "../Tier2Upload/Tier2Upload.scss"

const Tier2Account =  () => {
    const history = useHistory();
    const [form, setForm] = useState({ accountname: '',accountnum: '', confirmaccountnum: '', ifsccode: '' , bankname: '' , branchname: ''  });
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }))

    const uploaddetail = event => {
        event.preventDefault();
        // const { accountname , accountnum } = event.target.elements;
        history.push("/tier2/upload");
    }

    return (
        <div >
        <nav class="navbar is-info" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
        <a class="navbar-item" href="/">
            <img src={logo} width="150"  alt=""/>
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
     <p className="title has-text-info tier-2-head">Tier 2 Account details</p>
    <div className="tier-2-login">
            <div className="column is-4 is-offset-4">
            <form onSubmit={uploaddetail}> 
                <div className="field">
                    <div className="control">
                        <label className="label">Account Name</label>
                        <input className="input" type="text" name="accountname" placeholder="Account Holder Name" value={form.accountname} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Account Number</label>
                        <input className="input" type="password" name="accountnum" placeholder="Bank Account Number" value={form.accountnum} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Confirm Account Number</label>
                        <input className="input" type="password" name="confirmaccountnum" placeholder="Confirm Account Number" value={form.confirmaccountnum} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">IFSC Code</label>
                        <input className="input" type="text" name="ifsccode" placeholder="Bank IFSC code"  value={form.ifsccode} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Bank Name</label>
                        <input className="input" type="text" name="bankname" placeholder="Bank Name"  value={form.bankname} onChange={update} required/>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="label">Branch Name</label>
                        <input className="input" type="text" name="branchname" placeholder="Branch Name"  value={form.branchname} onChange={update} required/>
                    </div>
                </div>  
                <div className="field is-grouped is-grouped-centered">
                    <div className="buttons">
                        <button className="is-info  button " >Upload</button>
                    </div>
                </div>
                </form>
                </div>
            </div>
    </div>
    </div>
        
    )

};

export default Tier2Account;