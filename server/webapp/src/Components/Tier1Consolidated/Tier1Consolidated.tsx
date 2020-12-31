import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import logo from "./../../Graphics/logo.jpg";
import "./../Tier1DataUpdate/Tier1DataUpdate.scss";
import "../Tier2EarlyPayment/Tier2EarlyPayment.scss";
import Dinero from "dinero.js";
import BtnCellRenderer from "./BtnCellRenderer";
import { formatDate } from "../../Utils/DateUtils";

const Tier1Consolidated = () => {
  const history = useHistory();
  const [approvedtier2invoice, setApprovedtier2invoice] = useState([]);
  const [tier1data, setTier1data] = useState([]);
  const [invoicetodisapprove, setInvoicetodisapprove] = useState("");

  const columnDefs = [
    { headerName: "Invoice", field: "invoice" },
    { headerName: "Customer", field: "customer", minWidth: 200 },
    { headerName: "Invoice Date", field: "invoice_date", minWidth: 150 },
    { headerName: "Receivable Date", field: "receivable_date", minWidth: 180 },
    { headerName: "Receivable Amount", field: "receivable_amount", minWidth: 180 },
    { headerName: "Discounted Amount", field: "discounted_amount", minWidth: 200 },
    { headerName: "Net receivable amount", field: "new_receivable", minWidth: 230 },
  ];

  const columnDefs2 = [
    { headerName: "Invoice Number", field: "invoice" },
    { headerName: "Supplier", field: "supplier" },
    { headerName: "Payable Date", field: "payable_date", minWidth: 170 },
    { headerName: "Buffer Days", field: "buffer_days", minWidth: 150 },
    { headerName: "Payable Amount", field: "payable_amount", minWidth: 180 },
    { headerName: "Discounted Amount", field: "discounted_amount", minWidth: 200 },
    { headerName: "Net payable amount", field: "new_payable", minWidth: 230 },
  ];

  const columnDefs3 = [
    { headerName: "Invoice", field: "invoice" },
    { headerName: "Supplier", field: "supplier" },
    { headerName: "Invoice Date", field: "invoice_date", minWidth: 150 },
    { headerName: "Payable Date", field: "payable_date", minWidth: 150 },
    { headerName: "Receivable Amount", field: "receivable_amount", minWidth: 180 },
    { headerName: "Payable Amount", field: "payable_amount", minWidth: 180 },
    { headerName: "Approval Date", field: "approval_date", minWidth: 180 },
    {
      headerName: "Disapprove",
      field: "invoice",
      minWidth: 150,
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked(field: any) {
          console.log(field);
          setInvoicetodisapprove(field);
          document.getElementById("modal").style.display = "flex";
        },
      },
    },
  ];

  const defaultColDef = {
    minWidth: 150,
    sortable: true,
    flex: 1,
    filter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    cellStyle: { color: "Black", textAlign: "center" },
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

  const onGridReady = () => {
    axios
      .get("/api/ListTier1PayableReceivable?tier1Id=1") // TODO(Priyanshu)
      .then((response) => {
        setTier1data(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // tslint:disable-next-line: no-empty
  const onGridReady2 = () => {};

  const onGridReady3 = () => {
    axios
      .get("/api/ListTier2InvoicesForDiscounting?tier2Id=2") // TODO(Priyanshu)
      .then((response) => {
        setApprovedtier2invoice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const gettier1payable = () => {
    const takenpayable = tier1data.filter((element) => {
      return element.tier1PayableEntry === "Done";
    });
    return takenpayable.map((inv) => {
      return {
        invoice: inv.tier2Invoice.invoiceId,
        supplier: inv.tier2Invoice.tier2.actorInfo.name,
        invoice_date: formatDate(inv.tier2Invoice.invoiceDate),
        payable_date: formatDate(inv.tier2Invoice.dueDate),
        payable_amount: Dinero(inv.tier2Invoice.invoiceAmount).toFormat("$0,0"),
        discounted_amount: Dinero(inv.discountedAmount).toFormat("$0,0"),
        new_payable: Dinero(inv.tier2Invoice.receivableAmount).subtract(Dinero(inv.discountedAmount)).toFormat("$0,0"),
      };
    });
  };

  const gettier1receivable = () => {
    const takenreceivable = tier1data.filter((element) => {
      return element.tier1ReceivableEntry === "Done";
    });
    return takenreceivable.map((inv) => {
      return {
        invoice: inv.partAnchorInvoices.anchorInvoice.invoiceId,
        customer: inv.partAnchorInvoices.anchorInvoice.anchor.actorInfo.name,
        invoice_date: formatDate(inv.partAnchorInvoices.anchorInvoice.invoiceDate),
        receivable_amount: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).toFormat("$0,0"),
        receivable_date: formatDate(inv.partAnchorInvoices.anchorInvoice.dueDate),
        discounted_amount: Dinero(inv.discountedAmount).toFormat("$0,0"),
        new_receivable: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount)
          .subtract(Dinero(inv.discountedAmount))
          .toFormat("$0,0"),
      };
    });
  };

  const getapprovedtier2data = () => {
    return approvedtier2invoice.map((inv) => {
      return {
        invoice: inv.tier2Invoice.invoiceId,
        supplier: inv.tier2Invoice.tier2.actorInfo.name,
        invoice_date: inv.tier2Invoice.invoiceDate.slice(0, 10),
        payable_date: inv.tier2Invoice.dueDate.slice(0, 10),
        receivable_amount: Dinero(inv.tier2Invoice.invoiceAmount).toFormat("$0,0"),
        payable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat("$0,0"),
        approval_date: inv.tier2Invoice.lastUpdateTimestamp.slice(0, 10), // TODO(Priyanshu)
      };
    });
  };

  const changeapprovedstatus = () => {
    const disapprovetier2invoice = approvedtier2invoice.find((element) => {
      return element.tier2Invoice.invoiceId === invoicetodisapprove;
    });
    disapprovetier2invoice.tier2Invoice.approvalStatus = "Rejected";
    callapi(disapprovetier2invoice.tier2Invoice);
  };

  const callapi = (tier2invoice: any) => {
    axios
      .post("/api/UpdateTier2InvoiceForApproval", tier2invoice)
      .then((response) => {
        console.log(response);
        onGridReady3();
        document.getElementById("modal").style.display = "none";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closemodal = () => {
    document.getElementById("modal").style.display = "none";
  };

  const logout = () => {
    axios
      .get("/logout")
      .then((response) => {
        // handle success
        history.push("/");
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  const displaytab1 = () => {
    document.getElementById("table-1").style.display = "block";
    document.getElementById("table-2").style.display = "none";
    document.getElementById("table-3").style.display = "none";
    document.getElementById("tab-1").classList.add("is-active");
    document.getElementById("tab-2").classList.remove("is-active");
    document.getElementById("tab-3").classList.remove("is-active");
  };

  const displaytab2 = () => {
    document.getElementById("table-1").style.display = "none";
    document.getElementById("table-2").style.display = "block";
    document.getElementById("table-3").style.display = "none";
    document.getElementById("tab-1").classList.remove("is-active");
    document.getElementById("tab-2").classList.add("is-active");
    document.getElementById("tab-3").classList.remove("is-active");
  };

  const displaytab3 = () => {
    document.getElementById("table-1").style.display = "none";
    document.getElementById("table-2").style.display = "none";
    document.getElementById("table-3").style.display = "block";
    document.getElementById("tab-1").classList.remove("is-active");
    document.getElementById("tab-2").classList.remove("is-active");
    document.getElementById("tab-3").classList.add("is-active");
  };

  return (
    <div>
      <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} width="150" alt="" />
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

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <a className="navbar-item" href="/tier1/action">
              Invoice Approval
            </a>
            <a className="navbar-item" href="/tier1/data">
              Entry Adjustment
            </a>
            <a className="navbar-item" href="/tier1/consolidated">
              Consolidated View
            </a>
            <a className="navbar-item">Settings</a>
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary is-light" onClick={logout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="actiontop">
        <p className="title has-text-info tier-2-action" style={{ marginBottom: "40px" }}>
          Shyam International
        </p>
        {/* <div className="total-benefit has-background-info">Total Benefit: ₹10000</div> */}
      </div>

      <div className="tabs is-boxed">
        <ul>
          <li className="is-active" onClick={displaytab1} id="tab-1">
            <a>
              <span>Receivable discounted by Supplier</span>
            </a>
          </li>
          <li onClick={displaytab2} id="tab-2">
            <a>
              <span>Payables discounted by Supplier</span>
            </a>
          </li>
          <li onClick={displaytab3} id="tab-3">
            <a>
              <span>Invoices approved by Supplier</span>
            </a>
          </li>
        </ul>
      </div>

      {/* <div className="table-info has-background-info invoice-approved" style={{ width: "390px", marginTop: "15px", marginBottom: "15px"}}>Invoices for which Loan taken by Tier 2</div> */}
      {/* <div className="container has-background-grey-dark payables"   style={{width: "124px"}}>Receivables</div> */}
      <div className="ag-theme-material mygrid" id="table-1">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents}
          onGridReady={onGridReady}
          rowData={gettier1receivable()}
          domLayout="autoHeight"
        />
      </div>
      {/* <div className="container has-background-grey-dark payables">Payables</div> */}
      <div className="ag-theme-material mygrid" id="table-2" style={{ display: "none" }}>
        <AgGridReact
          columnDefs={columnDefs2}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady2}
          rowData={gettier1payable()}
          domLayout="autoHeight"
        />
      </div>
      {/* <div className="table-info has-background-info invoice-approved" >Tier 2 Invoices approved</div> */}
      <div>
        <div className="ag-theme-material mygrid" id="table-3" style={{ display: "none" }}>
          <AgGridReact
            columnDefs={columnDefs3}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents}
            onGridReady={onGridReady3}
            rowData={getapprovedtier2data()}
            rowSelection="multiple"
            domLayout="autoHeight"
          />
        </div>
        <div className="modal" id="modal">
          <div className="modal-background" onClick={closemodal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Confirmation</p>
              <button className="delete" aria-label="close" onClick={closemodal}></button>
            </header>
            <section className="modal-card-body">
              <p>Are you sure you want to Disapprove?</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={changeapprovedstatus}>
                Confirm
              </button>
              <button className="button is-danger" onClick={closemodal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tier1Consolidated;
