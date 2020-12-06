import React from "react";

const CheckboxRenderer = props =>  {
  
  const checkedHandler = event => {
    let checked = event.target.checked;
    let colId = props.column.colId;
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
