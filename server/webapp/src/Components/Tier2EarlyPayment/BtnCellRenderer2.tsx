import React from "react";
import { useHistory } from "react-router-dom";
import "./Tier2EarlyPayment.scss";

const BtnCellRenderer2 = () => {
  const history = useHistory();

  return (
    <button className="button is-accept" onClick={() => history.push("/tier2/upload")}>
      Reupload
    </button>
  );
};

export default BtnCellRenderer2;
