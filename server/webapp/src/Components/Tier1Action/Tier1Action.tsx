import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Nakad from "./../../Graphics/Nakad.svg";
import Notification from "./../../Graphics/Notification.svg";
import Support from "./../../Graphics/Support.svg";
import BtnCellRenderer from "./BtnCellRenderer";
import "./Tier1Action.scss";
import Dinero from "dinero.js";
import { formatDate } from "../../Utils/DateUtils";

const Tier1Action = () => {
  const history = useHistory();
  const [tier2actiondata, setTier2actiondata] = useState([]);
  const [invoicetoupdate, setInvoicetoupdate] = useState([]);
  const [tier2Invoiceurl, setTier2Invoiceurl] = useState("");
  const [tier2GRNurl, setTier2GRNurl] = useState("");
  const [remark, setRemark] = useState("");

  const updateremark = (event: React.ChangeEvent<HTMLTextAreaElement>) => setRemark(event.target.value);

  const showtablemoreinfo = () => {
    (document.getElementById("table-more-info") as HTMLElement).style.display = "block";
    console.log("it work");
  };

  const hidetablemoreinfo = () => {
    (document.getElementById("table-more-info") as HTMLElement).style.display = "none";
  };

  const columnDefs = [
    { headerName: "Invoice number", field: "invoice" },
    { headerName: "Supplier", field: "vendor", minWidth: 200 },
    { headerName: "Invoice date", field: "invoice_date" },
    { headerName: "Payable date", field: "payable_date" },
    { headerName: "Invoice amount", field: "invoice_amount", headerClass: "grid-header-right", cellStyle: { color: "#48AC23", textAlign: "right" , paddingRight:"42px"}},
    { headerName: "Payable amount", field: "payable_amount", minWidth: 180,headerClass: "grid-header-right",  cellStyle: { color: "#4072E3", textAlign: "right" , paddingRight:"42px"} },
    {
      headerName: "Details",
      field: "details",
      cellRenderer: "btnCellRenderer",
      headerClass: "grid-header-centered",
      cellStyle: { textAlign: "center" },
      cellRendererParams: {
        clicked(field: any) {
          console.log(field);
          setInvoicetoupdate(field[0]);
          if (field[1]) {
            setTier2Invoiceurl(field[1].data[0]);
            setTier2GRNurl(field[1].data[1]);
          }
          document.getElementById("modal").style.display = "flex";
        },
      },
      minWidth: 150,
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

  const onGridReady = () => {
    axios
      .get("/api/ListTier2Invoices?tier1Id=1&approvalStatus=Pending") // TODO(Priyanshu)
      .then((response) => {
        setTier2actiondata(response.data);
      })
      .catch((error) => {
        history.push({
          pathname: "/tier1",
          state: { alert: "true" },
        });
        console.log(error);
      });
  };

  const changestatus = (status: any) => {
    const tier2invoice = tier2actiondata.find((element) => {
      return element.invoiceId === invoicetoupdate;
    });
    tier2invoice.approvalStatus = status;
    tier2invoice.tier2InvoiceDetails.remark = remark;
    callapi(tier2invoice);
  };

  const callapi = (tier2invoice: any) => {
    axios
      .post("/api/UpdateTier2InvoiceForApproval", tier2invoice)
      .then((response) => {
        console.log(response);
        onGridReady();
        document.getElementById("modal").style.display = "none";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closemodal = () => {
    document.getElementById("modal").style.display = "none";
  };

  const getrowdata = () => {
    return tier2actiondata.map((inv) => {
      return {
        invoice: inv.invoiceId,
        vendor: inv.tier2.actorInfo.name,
        invoice_date: formatDate(inv.invoiceDate),
        payable_date: formatDate(inv.dueDate),
        invoice_amount: Dinero(inv.invoiceAmount).toFormat("$0,0"),
        payable_amount: Dinero(inv.receivableAmount).toFormat("$0,0"),
        details: [inv.invoiceId, inv.tier2InvoiceDetails],
      };
    });
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

  const displaytab1 = () => {
    document.getElementById("invoice").style.display = "block";
    document.getElementById("grn").style.display = "none";
    document.getElementById("tab-2").classList.remove("is-active");
    document.getElementById("tab-1").classList.add("is-active");
  };

  const displaytab2 = () => {
    document.getElementById("invoice").style.display = "none";
    document.getElementById("grn").style.display = "block";
    document.getElementById("tab-1").classList.remove("is-active");
    document.getElementById("tab-2").classList.add("is-active");
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
          <a className="navbar-item this-page" href="/tier1/action">
              Invoice Approval
            </a>
            <a className="navbar-item" href="/tier1/data">
              Entry Adjustment
            </a>
            <a className="navbar-item" href="/tier1/consolidated">
              Consolidated View
            </a>
          </div>
          <div className="navbar-right">
            <img src={Support} alt="" width="16px" className="support" />
            <img src={Notification} alt="" width="20px" />
            <div>
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  <p className="name-full">Shyam International</p> {/* Need to make this dynamic */}
                  <div className="name-first">
                    <p>S</p>
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
      <div className="main-content" style={{paddingTop: "20px"}}>
        <div id="table-more-info" className="has-background-warning">
          Tier 2 requests confirmation of invoice. Based on <br /> this it will discount invoice to get early payment.
        </div>
        <div className="table-info has-background-info" style={{ marginBottom: "20px", width: "300px"}}>
          Supplier invoices for approval
          <span onMouseOver={showtablemoreinfo} onMouseLeave={hidetablemoreinfo} className="moreinfospan">
            <i className="fas fa-info-circle"></i>
          </span>
        </div>
        <div>
          <div className="ag-theme-alpine mygrid">
            <AgGridReact
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              frameworkComponents={frameworkComponents}
              onGridReady={onGridReady}
              rowData={getrowdata()}
              domLayout="autoHeight"
              rowClassRules={{
                highlight(params) {
                  return params.data.invoice === "KEINV1234";
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
                <div className="tabs is-toggle">
                  <ul>
                    <li className="is-active" onClick={displaytab1} id="tab-1">
                      <a>
                        <span>Invoice</span>
                      </a>
                    </li>
                    <li onClick={displaytab2} id="tab-2">
                      <a>
                        <span>GRN</span>
                      </a>
                    </li>
                    <li id="tab-3">
                      <a>
                        <span>Debit Note</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <p className="image is-4by3" id="invoice">
                  <img src={tier2Invoiceurl} alt="" crossOrigin="anonymous" />
                </p>
                <p className="image is-4by3" id="grn">
                  <img src={tier2GRNurl} alt="" crossOrigin="anonymous" />
                </p>
                <div className="field">
                  <div className="control">
                    <label className="label">Remark</label>
                    <textarea
                      className="input"
                      name="remark"
                      placeholder="Write your remark here(if any)"
                      style={{ height: "80px" }}
                      value={remark}
                      onChange={updateremark}
                    />
                  </div>
                </div>

                <footer className="modal-card-foot">
                  <button
                    className="button is-success"
                    onClick={() => {
                      changestatus("Approved");
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="button is-danger"
                    onClick={() => {
                      changestatus("Rejected");
                    }}
                  >
                    Decline
                  </button>
                </footer>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tier1Action;
