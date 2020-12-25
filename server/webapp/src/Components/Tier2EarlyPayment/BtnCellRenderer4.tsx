import React, { Component } from "react";
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
      <button className="button is-danger" onClick={this.btnClickedHandler} style={{ marginTop: "3px" }}>
        Cancel
      </button>
    );
  }
}

export default BtnCellRenderer;
