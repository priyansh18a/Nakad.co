import React from "react";
import { useHistory } from "react-router-dom";

const BtnCellRenderer2 = () => { 
  const history = useHistory();
  
    return <button className="button is-primary" onClick={() => history.push("/tier2/upload")} style={{marginTop:"3px"}}>Reupload</button>;
  
}

export default BtnCellRenderer2;