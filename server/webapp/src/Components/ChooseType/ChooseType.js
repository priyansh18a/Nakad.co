import React from 'react';
import { useHistory } from "react-router-dom";
import logo from '../../Graphics/logo1.png';
import "./ChooseType.scss";


const ChooseType =  () => {
    const history = useHistory();

    return(
        <div className="choosemain container">
            <img  src={logo} className="main-logo" alt=""/>
            <div className="tier-1-2">
               <div className="tier-1 card"><button class="button btn" onClick={() => history.push({ pathname: "/tier1",state: { alert: "false" }})}>Login</button></div>
               <div className="tier-2 card"><button class="button btn" onClick={() => history.push("/tier2")}>Login</button></div>
            </div>
            <div className="bank card"><button class="button btn" onClick={() => history.push("/bank")}>Login</button></div>
        </div>
    );
};
export default ChooseType;