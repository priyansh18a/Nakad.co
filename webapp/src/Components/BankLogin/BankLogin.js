import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "../Tier1Login/Tier1Login.scss"

const BankLogin = () => {
    const history = useHistory();
    const [form, setForm] = useState({ bankname: '',userid: '', password: '' });
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }));

    const banklogin = event => {
        event.preventDefault();
        // const { companyid, userid, password} = event.target.elements;
        history.push("/bank/disbursement");
    }
    
    return (
        <div className="container">
        <p className="title has-text-info">Bank Login</p>
        <div className="tier-1-login">
         <div className="column is-4 is-offset-4">
         <form onSubmit={banklogin}>
            <div class="field">
                <div class="control">
                <label class="label">Bank Name</label>
                        <div class="select">
                        <select onChange={update} name="bankname" id="bankname" required >
                            <option value="">Select dropdown</option>
                            <option value="sbi">SBI Bank</option>
                            <option>ICICI Bank</option>
                            <option>Canara Bank</option>
                            <option>HDFC Bank</option>
                            <option>Axis Bank</option>
                            <option>Indian Bank</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">User ID</label>
                    <input className="input" type="text" name="userid" placeholder="User ID"  value={form.userid} onChange={update} required/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Password</label>
                    <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={update} required/>
                </div>
                <a class="help has-text-left" href="/bank">Forgot Company ID / User ID / Password</a>
            </div>
             <div className="field is-grouped is-grouped-centered">
                <div className="buttons">
                    <button className="is-info  button ">Login</button>
                </div>
            </div>
            </form>
            </div>
        </div>
        </div>
        
    );

   

};

export default BankLogin;