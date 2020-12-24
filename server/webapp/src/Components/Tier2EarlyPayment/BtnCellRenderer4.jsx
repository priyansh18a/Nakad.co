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
    return <button className="button is-danger" onClick={this.btnClickedHandler} style={{marginTop:"3px"}}>Cancel</button>;
  }
}

export default BtnCellRenderer;