import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory ,  useLocation  } from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "./Tier1Login.scss"


const Tier1Login = () => {
    const history = useHistory();
    const location = useLocation();
    const [form, setForm] = useState({ companyid: '',username: '', password: '' });
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }))
    useEffect(() => {
        // console.log(location.state.alert); 
        if(location.state !== undefined && location.state.alert === "true"){
            document.getElementById("flash-msg").style.display = "block";
            document.getElementById("msg").innerHTML = "Please Login to access Action page";
        }
     }, [location]);
    
    
    const logintier1 = event => {
        event.preventDefault();
        axios.post('/login', {
            username: form.username,
            password: form.password
          })
          .then(function (response) {
            if(response.status === 200){
                history.push("/tier1/action");
            }
            else if(response.status === 401){
                document.getElementById("flash-msg").style.display = "block";
                document.getElementById("msg").innerHTML = "Wrong Credential ! Please Try Again";
            }
          })
          .catch(function (error) {
            document.getElementById("flash-msg").style.display = "block";
            document.getElementById("msg").innerHTML = "Login Failed! Please Try Again";
            console.log(error);
          });
    }

    const closeflash = () => {
        document.getElementById("flash-msg").style.display = "none";
    }

    return (
        <div className="container">
        <p className="title has-text-info">Tier 1 Login</p>
        <div className="tier-1-login">
         <div className="column is-4 is-offset-4">
            <div className="notification is-danger" id="flash-msg">
                <button className="delete" onClick={closeflash}></button>
                <p id="msg"></p>
            </div>
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
                <a className="help has-text-left" href="/tier1">Forgot Company ID / User ID / Password</a>
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