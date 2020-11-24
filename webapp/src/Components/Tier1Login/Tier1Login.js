import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "./Tier1Login.scss"


const Tier1Login = () => {
    const history = useHistory();
    const [form, setForm] = useState({ companyid: '',username: '', password: '' });
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }))
    
    const logintier1 = event => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'username': form.username,
                'password': form.password
              })
        };
        
        fetch('/login', requestOptions)
            .then(response => {
                if(response.status == 200){
                    history.push("/tier1/action")
                }else {
                    alert("Login failed")
                }
            });
    }
    return (
        <div className="container">
        <p className="title has-text-info">Tier 1 Login</p>
        <div className="tier-1-login">
         <div className="column is-4 is-offset-4">
         <form onSubmit={logintier1}> 
            <div className="field">
                <div className="control">
                    <label className="label">User ID</label>
                    <input className="input" type="text" name="username" placeholder="User ID"  value={form.username} onChange={update} required/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Password</label>
                    <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={update} required/>
                </div>
                <a class="help has-text-left" href="/tier1">Forgot Company ID / User ID / Password</a>
            </div>
             <div className="field is-grouped is-grouped-centered">
                <div className="buttons">
                    <input type="submit" className="is-info  button "></input>
                </div>
            </div>
            </form>
            </div>
        </div>
        </div>
        
    );
};

export default Tier1Login;