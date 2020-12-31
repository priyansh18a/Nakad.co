import React from "react";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg";
import "./../Tier1DataUpdate/Tier1DataUpdate.scss";
import "./../Tier2EarlyPayment/Tier2EarlyPayment.scss";
import BtnCellRenderer from "./BtnCellRenderer";
import invoice from "../../Graphics/invoice.jpeg";

const BankCollection = () => {
  const history = useHistory();
  const columnDefs = [
    { headerName: "Loan number", field: "loan_number", },
    { headerName: "Loan amount", field: "loan_amount", headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "Repayment date", field: "repayment_date", minWidth: 200 },
    { headerName: "Linked invoice amount", field: "invoice_amount", minWidth: 200, headerClass: "grid-header-right", cellStyle: { color: "#4072E3", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "Invoice Payee", field: "invoice_payee", minWidth: 180},
    {
      headerName: "Amount appropriated to bank in Invoice Payee name SAP (Yes/No)",
      field: "amount_bank",
      minWidth: 300,
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
      loan_amount: "₹30,000",
      repayment_date: "06/02/2021",
      invoice_amount: "₹100,000",
      invoice_payee: "OEM -1",
      amount_bank: "Yes",
    },
    {
      loan_number: "2",
      loan_amount: "₹30,000",
      repayment_date: "12/02/2021",
      invoice_amount: "₹120,000",
      invoice_payee: "OEM -1",
      amount_bank: "Yes",
    },
    {
      loan_number: "3",
      loan_amount: "₹20,000",
      repayment_date: "17/02/2021",
      invoice_amount: "₹130,000",
      invoice_payee: "OEM -1",
      amount_bank: "Yes",
    },
    {
      loan_number: "4",
      loan_amount: "₹80,000",
      repayment_date: "18/02/2021",
      invoice_amount: "₹80,000",
      invoice_payee: "OEM -1",
      amount_bank: "Yes",
    },
    {
      loan_number: "5",
      loan_amount: "₹20,000",
      repayment_date: "22/02/2021",
      invoice_amount: "₹120,000",
      invoice_payee: "OEM -2",
      amount_bank: "Yes",
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
          <a className="navbar-item" href="/bank/disbursement">
              Disbursement Screen
            </a>
            <a className="navbar-item this-page" href="/bank/collection">
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
            rowClassRules={{
              highlight(params) {
                return params.data.loan_number === "1";
              },
            }}
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
              <p className="has-text-info is-size-4 has-text-weight-bold">Proof of Approval</p>
              <p className="image is-4by3">
                <img src={invoice} alt="" />
              </p>
              <p className="has-text-info is-size-4 has-text-weight-bold">Debit Note</p>
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

export default BankCollection;
