import React, { Component } from "react";
import "./Tier2EarlyPayment.scss";
interface BtnCellRendererProps {
  clicked: (arg0: string) => void;
  value: string;
}

class BtnCellRenderer extends Component<BtnCellRendererProps> {
  constructor(props: BtnCellRendererProps) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return (
      <button className="button is-cancel" onClick={this.btnClickedHandler}>
        Cancel
      </button>
    );
  }
}

export default BtnCellRenderer;
