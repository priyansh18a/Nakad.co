import React, { Component } from "react";

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return <button className="button is-primary" onClick={this.btnClickedHandler} style={{marginTop:"3px"}}>Confirm</button>;
  }
}

export default BtnCellRenderer;