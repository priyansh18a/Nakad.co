import React from "react";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg"
import "./../Tier1DataUpdate/Tier1DataUpdate.scss";
import "./../Tier2EarlyPayment/Tier2EarlyPayment.scss";
import BtnCellRenderer from "./BtnCellRenderer";
import invoice from "../../Graphics/invoice.jpeg";

const BankDisbursement = () => {
  const history = useHistory();
  const columnDefs = [
    { headerName: "Loan Number", field: "loan_number", minWidth: 155, maxWidth: 200 },
    { headerName: "Requesting Party Name", field: "party_name", minWidth: 200 },
    { headerName: "Requesting Party Account", field: "party_account", minWidth: 200 },
    { headerName: "Loan Amount to be Disbursed", field: "loan_amount", minWidth: 200, headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"} },
    { headerName: "Annualized IRR", field: "annualized_irr", minWidth: 200 },
    { headerName: "Repayment Date", field: "repayment_date", minWidth: 170 },
    { headerName: "Linked Invoice Amount", field: "invoice_amount", minWidth: 170 },
    { headerName: "Invoice Payee Name", field: "payee_name", minWidth: 170 },
    { headerName: "Loan already issued against invoice", field: "loan_issued", minWidth: 205, headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "GRN issued against the linked invoice(Yes/No)", field: "grn_issued", minWidth: 230 },
    {
      headerName: "Rupee value of debit note(s) issued against the linked invoice",
      field: "rupee_value",
      minWidth: 300,
      headerClass: "grid-header-right", cellStyle: { color: "#4072E3", textAlign: "right" , paddingRight:"42px"}
    },
    {
      headerName: "Details",
      field: "details",
      cellRenderer: "btnCellRenderer",
      headerClass: "grid-header-centered",
      cellStyle: { textAlign: "center" },
      cellRendererParams: {
        clicked() {
          const element = document.getElementById("modal");
          if (element != null) {
            element.style.display = "flex";
          }
        },
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    cellStyle: { color: "#4D4F5C", textAlign: "left" },
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
    filter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    headerComponentParams: {
      template:
        '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        "  </div>" +
        "</div>",
    },
  };

  const frameworkComponents = {
    btnCellRenderer: BtnCellRenderer,
  };

  const rowData = [
    {
      loan_number: "1",
      party_name: "Kamal Enterprises",
      party_account: "120967123456",
      loan_amount: "₹29,200",
      annualized_irr: "11.40%",
      repayment_date: "06/02/2021",
      invoice_amount: "OEMINV1234",
      payee_name: "OEM -1",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
    {
      loan_number: "2",
      party_name: "S.Ram & Sons",
      party_account: "166165845222",
      loan_amount: "₹83,100",
      annualized_irr: "11.06%",
      repayment_date: "18/02/2021",
      invoice_amount: "OEMINV4963",
      payee_name: "OEM -1",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
    {
      loan_number: "3",
      party_name: "Abhinav Traders",
      party_account: "178779074688",
      loan_amount: "₹73,300",
      annualized_irr: "11.35%",
      repayment_date: "21/02/2021",
      invoice_amount: "OEMINV9727",
      payee_name: "OEM -1",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
    {
      loan_number: "4",
      party_name: "UMEX",
      party_account: "158875651126",
      loan_amount: "₹41,000",
      annualized_irr: "11.14%",
      repayment_date: "02/03/2021",
      invoice_amount: "OEMINV3357",
      payee_name: "OEM -1",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
    {
      loan_number: "5",
      party_name: "Kamal Enterprises",
      party_account: "156026129563",
      loan_amount: "₹38,500",
      annualized_irr: "11.61%",
      repayment_date: "05/03/2021",
      invoice_amount: "OEMINV6290",
      payee_name: "OEM -2",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
    {
      loan_number: "6",
      party_name: "Kamal Enterprises",
      party_account: "148525035541",
      loan_amount: "₹25,400",
      annualized_irr: "11.37%",
      repayment_date: "26/02/2021",
      invoice_amount: "OEMINV7714",
      payee_name: "OEM -2",
      loan_issued: "₹0",
      grn_issued: "Yes",
      rupee_value: "₹0",
    },
  ];

  const onGridReady = () => {
    // const gridApi = params.api;
    // const gridColumnApi = params.columnApi;
  };

  const closemodal = () => {
    const element = document.getElementById("modal");
    if (element != null) {
      element.style.display = "none";
    }
  };

  const logout = () => {
    axios
      .get("/logout")
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
       <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Nakad} height="37" alt="" className="main-logo" />
          </a>
          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-center">
          <a className="navbar-item  this-page" href="/bank/disbursement">
              Disbursement Screen
            </a>
            <a className="navbar-item" href="/bank/collection">
              Collection Screen
            </a>
          </div>
          <div className="navbar-right">
            <img src={Support} alt="" width="16px" className="support" />
            <img src={Notification} alt="" width="20px" />
            <div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <p className="name-full">ICICI Bank</p> {/* Need to make this dynamic */}
                  <div className="name-first">
                    <p>I</p>
                  </div>
                </a>

                <div className="navbar-dropdown">
                  <a className="navbar-item">Profile</a>
                  <a className="navbar-item">Settings</a>
                  <a className="navbar-item" onClick={logout}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="main-content">
      <div>
        <div className="ag-theme-alpine mygrid" style={{paddingTop: "5vw"}}>
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents}
            onGridReady={onGridReady}
            rowData={rowData}
            domLayout="autoHeight"
          />
        </div>
        <div className="modal" id="modal">
          <div className="modal-background" onClick={closemodal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">More Details</p>
              <button className="delete" onClick={closemodal} aria-label="close"></button>
            </header>
            <section className="modal-card-body">
              <p className="has-text-info is-size-4 has-text-weight-bold">Invoice</p>
              <p className="image is-4by3">
                <img src={invoice} alt="" />
              </p>
              <p className="has-text-info is-size-4 has-text-weight-bold">GRN</p>
              <p className="image is-4by3">
                <img src={invoice} alt="" />
              </p>
            </section>

            <footer className="modal-card-foot">
              <button className="button is-success" onClick={closemodal}>
                Approve
              </button>
              <button className="button is-danger" onClick={closemodal}>
                Decline
              </button>
            </footer>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default BankDisbursement;
