import React from "react";

const CheckboxRenderer = props =>  {
  
  const checkedHandler = event => {
    const checked = event.target.checked;
    const colId = props.column.colId;
    props.node.setDataValue(colId, checked);
  }
  
    return (
      <input
        type="checkbox"
        onClick={checkedHandler}
        checked={props.value}
        style={{width:"16px", height:"16px"}}
      />
    );
  
}

export default CheckboxRenderer;
