import React, { Component } from "react";

interface BtnCellRendererProps {
  changed: (arg0: string) => void;
  value: string;
}

class BtnCellRenderer extends Component<BtnCellRendererProps> {
  constructor(props: BtnCellRendererProps) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }

  btnClickedHandler() {
    this.props.changed(this.props.value);
  }

  render() {
    return (
      <input
        className=""
        onChange={this.btnClickedHandler}
        style={{ height: "45px", width: "150", outline: "none", border: "none" }}
      />
    );
  }
}

export default BtnCellRenderer;
