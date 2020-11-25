import React, { Component } from "react";

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler() {
    this.props.changed(this.props.value);
  }

  render() {
    return <input className=""  onChange={this.btnClickedHandler} style={{height:"45px",width:"150",outline:"none",border:"none" }}/>;
  }
}

export default BtnCellRenderer;