import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg";
import Dinero from "dinero.js";
import "./Tier1DataUpdate.scss";
import BtnCellRenderer from "./BtnCellRenderer";
import BtnCellRenderer2 from "./BtnCellRenderer2";
import { formatDate } from "../../Utils/DateUtils";

const Tier1DataUpdate = () => {
  const history = useHistory();
  const [tier1payable, setTier1payable] = useState([]);
  const [tier1receivable, setTier1receivable] = useState([]);
  const [anchortier2mappingtoupdate, setAnchortier2mappingtoupdate] = useState("");

  const columnDefs1 = [
    { headerName: "Invoice number", field: "invoice" },
    { headerName: "Supplier", field: "supplier" },
    { headerName: "Invoice date", field: "invoice_date", minWidth: 180 },
    { headerName: "Payable amount", field: "payable_amount", minWidth: 200, headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "Amount discounted", field: "discounted_amount", minWidth: 200 , headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "Remaining amount", field: "remaining_payable", minWidth: 200 ,headerClass: "grid-header-right", cellStyle: { color: "#4072E3", textAlign: "right" , paddingRight:"42px"}},
    {
      headerName: "Entry adjusted in ERP",
      field: "details",
      minWidth: 200,
      cellRenderer: "btnCellRenderer1",
      headerClass: "grid-header-centered",
      cellStyle: { textAlign: "center" },
      cellRendererParams: {
        clicked(field: any) {
          console.log(field);
          setAnchortier2mappingtoupdate(field);
          document.getElementById("modal").style.display = "flex";
        },
      },
    },
  ];

  const columnDefs2 = [
    { headerName: "Invoice number", field: "invoice" },
    { headerName: "Customer", field: "customer" },
    { headerName: "Invoice date", field: "invoice_date", minWidth: 150 },
    { headerName: "Receivable amount", field: "receivable_amount", minWidth: 200, headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"} },
    { headerName: "Amount discounted", field: "discounted_amount", minWidth: 220, headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"} },
    { headerName: "Remaining amount", field: "remaining_receivable", minWidth: 220, headerClass: "grid-header-right", cellStyle: { color: "#4072E3", textAlign: "right" , paddingRight:"42px"} },
    {
      headerName: "Entry adjusted in ERP",
      field: "details",
      minWidth: 150,
      cellRenderer: "btnCellRenderer2",
      headerClass: "grid-header-centered",
      cellStyle: { textAlign: "center" },
      cellRendererParams: {
        clicked(field: any) {
          console.log(field);
          setAnchortier2mappingtoupdate(field);
          document.getElementById("modal2").style.display = "flex";
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

  const frameworkComponents1 = {
    btnCellRenderer1: BtnCellRenderer,
  };

  const frameworkComponents2 = {
    btnCellRenderer2: BtnCellRenderer2,
  };

  const onGridReady = () => {
    axios
      .get("/api/ListTier1PayableReceivable?tier1Id=1") // TODO(Priyanshu)
      .then((response) => {
        const pendingpayable = response.data.filter((element: any) => {
          return element.tier1PayableEntry === "Pending";
        });
        const rowdata1 = pendingpayable.map((inv: any) => {
          return {
            invoice: inv.tier2Invoice.invoiceId,
            supplier: inv.tier2Invoice.tier2.actorInfo.name,
            invoice_date: formatDate(inv.tier2Invoice.invoiceDate),
            discounted_amount: Dinero(inv.discountedAmount).toFormat("$0,0"),
            payable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat("$0,0"),
            remaining_payable: Dinero(inv.tier2Invoice.receivableAmount)
              .subtract(Dinero(inv.discountedAmount))
              .toFormat("$0,0"),
            details: [inv.tier2Invoice.invoiceId, inv.partAnchorInvoices.anchorInvoice.invoiceId],
          };
        });
        setTier1payable(rowdata1);
        const pendingreceivable = response.data.filter((element: any) => {
          return element.tier1ReceivableEntry === "Pending";
        });
        const rowdata2 = pendingreceivable.map((inv: any) => {
          return {
            invoice: inv.partAnchorInvoices.anchorInvoice.invoiceId,
            customer: inv.partAnchorInvoices.anchorInvoice.anchor.actorInfo.name,
            invoice_date: formatDate(inv.partAnchorInvoices.anchorInvoice.invoiceDate),
            receivable_amount: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).toFormat("$0,0"),
            discounted_amount: Dinero(inv.discountedAmount).toFormat("$0,0"),
            remaining_receivable: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount)
              .subtract(Dinero(inv.discountedAmount))
              .toFormat("$0,0"),
            details: [inv.tier2Invoice.invoiceId, inv.partAnchorInvoices.anchorInvoice.invoiceId],
          };
        });
        setTier1receivable(rowdata2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // tslint:disable-next-line: no-empty
  const onGridReady2 = (params: any) => {};

  // TODO (Priyanshu) Need to complete this
  const removepayableentry = () => {
    axios
      .post("/api/UpdateTier1PayableReceivable", {
        anchorInvoiceId: anchortier2mappingtoupdate[1],
        tier2InvoiceId: anchortier2mappingtoupdate[0],
        tier1PayableEntry: "Done",
        tier1ReceivableEntry: "Nochange",
      })
      .then((response) => {
        document.getElementById("modal").style.display = "none";
        const newRowData = tier1payable.filter((element) => {
          return element.invoice !== anchortier2mappingtoupdate[1];
        });
        setTier1payable(newRowData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removereceivableentry = () => {
    axios
      .post("/api/UpdateTier1PayableReceivable", {
        anchorInvoiceId: anchortier2mappingtoupdate[1],
        tier2InvoiceId: anchortier2mappingtoupdate[0],
        tier1PayableEntry: "Nochange",
        tier1ReceivableEntry: "Done",
      })
      .then((response) => {
        document.getElementById("modal2").style.display = "none";
        const newRowData = tier1receivable.filter((element) => {
          return element.invoice !== anchortier2mappingtoupdate[0];
        });
        setTier1receivable(newRowData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const closemodal = () => {
    document.getElementById("modal").style.display = "none";
  };

  const closemodal2 = () => {
    document.getElementById("modal2").style.display = "none";
  };

  const showtablemoreinfo = () => {
    document.getElementById("table-more-info").style.display = "block";
    console.log("it work");
  };

  const hidetablemoreinfo = () => {
    document.getElementById("table-more-info").style.display = "none";
  };

  const displaypending = () => {
    document.getElementById("payable").style.display = "block";
    document.getElementById("receivables").style.display = "none";
    document.getElementById("list-payable").classList.add("is-active");
    document.getElementById("list-receivables").classList.remove("is-active");
  };

  const displaydone = () => {
    document.getElementById("payable").style.display = "none";
    document.getElementById("receivables").style.display = "block";
    document.getElementById("list-payable").classList.remove("is-active");
    document.getElementById("list-receivables").classList.add("is-active");
  };

  return (
    <div>
     <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={Nakad} height="37" alt="" className="main-logo"/>
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
          <a className="navbar-item " href="/tier1/action">
              Invoice Approval
            </a>
            <a className="navbar-item this-page" href="/tier1/data">
              Entry Adjustment
            </a>
            <a className="navbar-item" href="/tier1/consolidated">
              Consolidated View
            </a>
          </div>
           <div className="navbar-right">
             <img src={Support} alt="" width="16px" className="support"/>
             <img src={Notification} alt="" width="20px" />
             <div>
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">
                    <p className="name-full">Shyam International</p>  {/* Need to make this dynamic */}
                     <div className="name-first"><p>S</p></div>
                  </a>

                  <div className="navbar-dropdown">
                    <a className="navbar-item">
                      Profile
                    </a>
                    <a className="navbar-item">
                      Settings
                    </a>
                    <a className="navbar-item" onClick={logout}>
                      Logout
                    </a>
                  </div>
                  </div>
             </div>
             
          </div> 

        </div>
      </nav>
      <div className="main-content"  style={{paddingTop: "20px"}}>

      <div id="table-more-info" className="has-background-warning">
        Tier 2 has discounted its invoice for early payments. Request <br />
        you to make following changes in your accounting system.
      </div>
      <div className="table-info has-background-info" style={{ width: "300px" }}>
        ERP entry adjustment
        <span onMouseOver={showtablemoreinfo} onMouseLeave={hidetablemoreinfo} className="moreinfospan">
          <i className="fas fa-info-circle"></i>
        </span>
      </div>

      <div className="tabs is-toggle">
        <ul>
          <li className="is-active" onClick={displaypending} id="list-payable">
            <a>
              <span>Payables</span>
            </a>
          </li>
          <li onClick={displaydone} id="list-receivables">
            <a>
              <span>Receivables</span>
            </a>
          </li>
        </ul>
      </div>
      {/* <div className="container has-background-grey-dark payables" style={ { marginTop: "11px"} }>Payables</div> */}
      <div className="ag-theme-alpine mygrid" id="payable">
        <AgGridReact
          columnDefs={columnDefs1}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents1}
          onGridReady={onGridReady}
          rowData={tier1payable}
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
            <p>Are you sure you have completed the payment?</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={removepayableentry}>
              Confirm
            </button>
            <button className="button is-danger" onClick={closemodal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
      {/* <div className="container has-background-grey-dark payables" style={{ width: 116, marginTop: "50px"}}>Receivables</div> */}
      <div className="ag-theme-alpine mygrid" id="receivables" style={{ display: "none" }}>
        <AgGridReact
          columnDefs={columnDefs2}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents2}
          onGridReady={onGridReady2}
          rowData={tier1receivable}
          rowSelection="multiple"
          domLayout="autoHeight"
        />
      </div>
      <div className="modal" id="modal2">
        <div className="modal-background" onClick={closemodal2}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Confirmation</p>
            <button className="delete" aria-label="close" onClick={closemodal2}></button>
          </header>
          <section className="modal-card-body">
            <p>Are you sure you have updated in your database?</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={removereceivableentry}>
              Confirm
            </button>
            <button className="button is-danger" onClick={closemodal2}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Tier1DataUpdate;
