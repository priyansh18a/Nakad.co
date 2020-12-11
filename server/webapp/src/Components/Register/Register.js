import React, { useState} from 'react';
// import { useHistory } from "react-router-dom";
import axios from 'axios';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import "../Tier1Login/Tier1Login.scss"


const Register = () => {
    const [form, setForm] = useState({ name : '', email: '', password: '' });
    const update = (({ target }) => setForm({ ...form, [target.name]: target.value }))
    
    const register = event => {
        event.preventDefault();
        axios.post('/register', {
            email: form.email,
            password: form.password,
            data:{name:form.name}
          })
          .then(function (response) {
            if(response.data.message){
                document.getElementById("flash-msg").style.display = "block";
                document.getElementById("msg").innerHTML = "User Already Exist! Please Login";
            }
            else{
                console.log(response.body);
                document.getElementById("flash-msg2").style.display = "block";
                document.getElementById("msg2").innerHTML = 'Registration Successful. Please <a href="/tier1">Login</a> here.';
            }  
          })
          .catch(function (error) {
            document.getElementById("flash-msg").style.display = "block";
            document.getElementById("msg").innerHTML = "Registration Failed! Please Try Again";
            console.log(error);
          });
       
    }
    const closeflash = () => {
        document.getElementById("flash-msg").style.display = "none";
        document.getElementById("flash-msg2").style.display = "none";
    }
    

    return (
        <div className="container">
        <p className="title has-text-info">Register</p>
        <div className="tier-1-login">
         <div className="column is-4 is-offset-4">
         <div class="notification is-danger" id="flash-msg">
                <button class="delete" onClick={closeflash}></button>
                <p id="msg"></p>
        </div>
        <div class="notification is-primary" id="flash-msg2">
                <button class="delete" onClick={closeflash}></button>
                <p id="msg2"></p>
        </div>
         <form onSubmit={register}> 
            <div className="field">
                <div className="control">
                    <label className="label">Name</label>
                    <input className="input" type="text" name="name" placeholder="Name" value={form.name} onChange={update} required/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">Email</label>
                    <input className="input" type="email" name="email" placeholder="Email"  value={form.email} onChange={update} required/>
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
                    <button className="is-info  button " style={{marginBottom:"15px"}}>Register</button>
                </div>
            </div>
            </form>
            <small >Already have a account<a class="help" href="/tier1" style={{marginTop:"0px"}}>Login here </a></small>
            </div>
        </div>
        </div>
        
    );

   

};

export default Register;