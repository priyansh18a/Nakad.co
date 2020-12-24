import React,  { useState} from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {AgGridReact } from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import logo from './../../Graphics/logo.jpg';
import Dinero from "dinero.js";
import './Tier1DataUpdate.scss';
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import BtnCellRenderer2 from "./BtnCellRenderer2.jsx";
import {formatDate} from "../../Utils/DateUtils";

const Tier1DataUpdate = () => {
    const history = useHistory();
    const [tier1payable, setTier1payable] = useState([]);
    const [tier1receivable, setTier1receivable] = useState([]);
    const [anchortier2mappingtoupdate,  setAnchortier2mappingtoupdate] = useState('');

    const columnDefs1 = [
        {   headerName:"Invoice #",
            field: "invoice",
            maxWidth: 150
        },
        {   headerName:"Supplier",
            field: "vendor"
        },
        {   headerName:"Invoice Date",
            field: "invoice_date",
            minWidth: 180
        },
        {   headerName:"Payable Amount",
            field: "payable_amount",
            minWidth: 200
        },
        {   headerName: "Amount Discounted",
            field: "discounted_amount",
            minWidth: 200
        },
        {   headerName:"Remaining Payable",
            field: "remaining_payable",
            minWidth: 200,
        },
        {   headerName:"Confirm",
            field: "details",
            minWidth: 150,
            cellRenderer: "btnCellRenderer1",
            cellRendererParams: {
              clicked: function(field) {
                  console.log(field);
                  setAnchortier2mappingtoupdate(field);
                  document.getElementById('modal').style.display = "flex";
              }
            }
        }
    ]

    const columnDefs2 = [
        {   headerName:"Invoice",
            field: "invoice",
            maxWidth: 150,
        },
        {   headerName:"Payer",
            field: "payer"
        },
        {   headerName:"Invoice Date",
            field: "invoice_date",
            minWidth: 150
        },
        {   headerName:"Receivable Amount",
            field: "receivable_amount",
            minWidth: 200
        },
        {   headerName: "Amount Discounted",
            field: "discounted_amount",
            minWidth: 220
        },
        {   headerName:"Remaining Receivable",
            field: "remaining_receivable",
            minWidth: 220,
        },
        {   headerName:"Confirm",
            field: "details",
            minWidth: 150,
            cellRenderer: "btnCellRenderer2",
            cellRendererParams: {
                clicked: function(field) {
                    console.log(field);
                    setAnchortier2mappingtoupdate(field);
                    document.getElementById('modal2').style.display = "flex";
                }
              }
           
        }
    ]

    const defaultColDef = {
        minWidth: 150,
        sortable:true,
        flex: 1,
        resizable: true,
        wrapText: true,
        filter: true,
        autoHeight: true,
        cellStyle: {color: 'Black', textAlign: 'center'},
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
              '  </div>' +
              '</div>'
          }
    }
    
    const frameworkComponents1 =  {
        btnCellRenderer1: BtnCellRenderer
        
    }

    const frameworkComponents2 =  {
        btnCellRenderer2: BtnCellRenderer2
    }

    const onGridReady = params => {
        axios.get("/api/ListTier1PayableReceivable?tier1Id=1") // TODO(Priyanshu)
        .then(function (response) {  
            const pendingpayable = response.data.filter(element => {
                return element.tier1PayableEntry === "Pending";
            });
            const rowdata1 =  pendingpayable.map(inv => {
                return {
                    invoice: inv.partAnchorInvoices.anchorInvoice.invoiceId,
                    vendor: "Maruti", //TODO(Priyanshu)
                    invoice_date: formatDate(inv.partAnchorInvoices.anchorInvoice.invoiceDate),
                    discounted_amount: Dinero(inv.discountedAmount).toFormat('$0,0'),
                    payable_amount: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).toFormat('$0,0'),
                    remaining_payable: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).subtract(Dinero(inv.discountedAmount)).toFormat('$0,0'),
                    details: [inv.tier2Invoice.invoiceId, inv.partAnchorInvoices.anchorInvoice.invoiceId]
                };
            });
            setTier1payable(rowdata1);
            const pendingreceivable = response.data.filter(element => {
                return element.tier1ReceivableEntry === "Pending";
            });
            const rowdata2 = pendingreceivable.map(inv => {
                return {
                    invoice: inv.tier2Invoice.invoiceId,
                    payer: "Maruti", //TODO(Priyanshu)
                    invoice_date: inv.tier2Invoice.invoiceDate.slice(0,10),
                    receivable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat('$0,0'),
                    discounted_amount: Dinero(inv.discountedAmount).toFormat('$0,0'),
                    remaining_receivable: Dinero(inv.tier2Invoice.receivableAmount).subtract(Dinero(inv.discountedAmount)).toFormat('$0,0'),
                    details: [inv.tier2Invoice.invoiceId, inv.partAnchorInvoices.anchorInvoice.invoiceId]
                };
            });
            setTier1receivable(rowdata2);
        })
        .catch(function (error) {
            console.log(error);
        })
       
    };

    const onGridReady2 = params => {

    };

    // TODO (Priyanshu) Need to complete this
    const removepayableentry = () => {
        const newRowData = tier1payable.filter(element => {
            return element.invoice !== anchortier2mappingtoupdate[1];
        });
        setTier1payable(newRowData);
        document.getElementById('modal').style.display = "none";
        axios.post("/api/UpdateTier1PayableReceivable", {
            anchorInvoiceId:anchortier2mappingtoupdate[1],
            tier2InvoiceId:anchortier2mappingtoupdate[0],
            tier1PayableEntry:"Done",
            tier1ReceivableEntry:"Nochange"
        }) 
        .then(function (response) { 
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const removereceivableentry = () => {
        const newRowData = tier1receivable.filter(element => {
            return element.invoice !== anchortier2mappingtoupdate[0];
        });
        setTier1receivable(newRowData);
        document.getElementById('modal2').style.display = "none";
        axios.post("/api/UpdateTier1PayableReceivable", {
            anchorInvoiceId:anchortier2mappingtoupdate[1],
            tier2InvoiceId:anchortier2mappingtoupdate[0],
            tier1PayableEntry:"Nochange",
            tier1ReceivableEntry:"Done"
        }) 
        .then(function (response) { 
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const logout = () => {
        axios.get('/logout')
        .then(function (response) {
            // handle success
            history.push("/");
        })
        .catch(function (error){
            // handle error
            console.log(error);
        })
    }

    const closemodal = () => {
        document.getElementById('modal').style.display = "none";
    }

    const closemodal2 = () => {
        document.getElementById('modal2').style.display = "none";
    }

    const showtablemoreinfo = () => {
        document.getElementById('table-more-info').style.display = "block";
        console.log('it work');
    }

    const hidetablemoreinfo = () => {
        document.getElementById('table-more-info').style.display = "none"; 
    }

    const displaypending = () => {
        document.getElementById("payable").style.display = "block";
        document.getElementById("receivables").style.display = "none";
        document.getElementById("list-payable").classList.add("is-active");
        document.getElementById("list-receivables").classList.remove("is-active");
    }

    const displaydone = () => {
        document.getElementById("payable").style.display = "none";
        document.getElementById("receivables").style.display = "block";
        document.getElementById("list-payable").classList.remove("is-active");
        document.getElementById("list-receivables").classList.add("is-active");
    }

    return (
        <div>
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        <a className="navbar-item" href="/">
            <img src={logo} width="150" alt=""/>
        </a>
    
        <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
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
            <a className="navbar-item">
            Settings
            </a>
            <div className="navbar-item">
            <div className="buttons">
            <button className="button is-primary is-light"  onClick={logout}>
                Log Out
            </button>
            </div>
        </div>
        </div>
        </div>
    </nav>
    <div className="actiontop">
        <p className="title has-text-info tier-2-action">Shyam International</p>
        <button className="button is-success is-outlined notification"><span className="icon"><i className="fas fa-bell"></i></span><span>Notification</span></button>
        {/* <div className="total-benefit has-background-info">Total Benefit: ₹10000</div> */}
    </div>

    <div id="table-more-info" className="has-background-warning"><span className="has-text-info">More Info: </span>Tier 2 has discounted its invoice for early payments<br/>Request to make following changes in your accounting system.</div>
    <div className="table-info has-background-info" style={{width: "300px"}} >ERP entry adjustment<span onMouseOver={showtablemoreinfo} onMouseLeave={hidetablemoreinfo} className="moreinfospan"><i className="fas fa-info-circle" ></i></span></div>

    <div className="tabs is-boxed">
            <ul>
                <li className="is-active" onClick={displaypending} id="list-payable">
                    <a><span>Payables</span></a>
                </li>
                <li  onClick={displaydone} id="list-receivables">
                    <a><span>Receivables</span></a>
                </li>
            </ul>
    </div>
    {/* <div className="container has-background-grey-dark payables" style={ { marginTop: "11px"} }>Payables</div> */}
    <div className="ag-theme-material mygrid" id="payable">
            <AgGridReact
                columnDefs={columnDefs1}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents1}
                onGridReady={onGridReady}
                rowData={tier1payable}
                rowSelection="multiple"
                domLayout='autoHeight'
            />
    </div>
    <div className="modal" id="modal"  >
            <div className="modal-background" onClick={closemodal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Confirmation</p>
                <button className="delete" aria-label="close" onClick={closemodal} ></button>
                </header>
                <section className="modal-card-body">
                 <p>Are you sure you have completed the payment?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={removepayableentry} >Confirm</button>
                    <button className="button is-danger" onClick={closemodal} >Decline</button>
                </footer>
            </div>
        </div>
    {/* <div className="container has-background-grey-dark payables" style={{ width: 116, marginTop: "50px"}}>Receivables</div> */}
    <div className="ag-theme-material mygrid" id="receivables"  style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents2}
                onGridReady={onGridReady2}
                rowData={tier1receivable}
                rowSelection="multiple"
                domLayout='autoHeight'
            />
    </div>
    <div className="modal" id="modal2"  >
            <div className="modal-background" onClick={closemodal2}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Confirmation</p>
                <button className="delete" aria-label="close" onClick={closemodal2} ></button>
                </header>
                <section className="modal-card-body">
                 <p>Are you sure you have updated in your database?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={removereceivableentry} >Confirm</button>
                    <button className="button is-danger" onClick={closemodal2} >Decline</button>
                </footer>
            </div>
        </div>
    </div>
    );

}

export default Tier1DataUpdate;
