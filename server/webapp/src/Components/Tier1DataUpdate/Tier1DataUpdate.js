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


const Tier1DataUpdate = () => {
    const history = useHistory();
    const [tier1payablereceivable, setTier1payablereceivable] = useState([]);
    const [invoicetoremove, setInvoicetoremove] = useState('');

    const columnDefs1 = [
        {   headerName:"Invoice",
            field: "invoice",
            maxWidth: 150,
            sortable:true
        },
        {   headerName:"Vendor",
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
            sortable:true
        },
        {   headerName:"Confirm",
            field: "invoice",
            minWidth: 150,
            cellRenderer: "btnCellRenderer1",
            cellRendererParams: {
              clicked: function(field) {
                  console.log(field);
                  setInvoicetoremove(field);
                  document.getElementById('modal').style.display = "flex";
              }
            }
        }
    ]

    const columnDefs2 = [
        {   headerName:"Invoice",
            field: "invoice",
            maxWidth: 150,
            sortable:true
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
            sortable:true
        },
        {   headerName:"Confirm",
            field: "cofirm",
            minWidth: 150,
            cellRenderer: "btnCellRenderer2",
            cellRendererParams: {
                clicked: function(field) {
                    console.log(field);
                    setInvoicetoremove(field);
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
        autoHeight: true,
        cellStyle: {color: 'Black'},
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
            setTier1payablereceivable(response.data);      
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const onGridReady2 = params => {

    };

    const getpayabledata = () => {
        return tier1payablereceivable.map(inv => {
             return {
                 invoice: inv.partAnchorInvoices.anchorInvoice.invoiceId,
                 vendor: "Maruti", //TODO(Priyanshu)
                 invoice_date: inv.partAnchorInvoices.anchorInvoice.invoiceDate.slice(0,10),
                 discounted_amount: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).subtract(Dinero(inv.partAnchorInvoices.partialAmount)).toFormat('$0.00'),
                 payable_amount: Dinero(inv.partAnchorInvoices.anchorInvoice.invoiceAmount).toFormat('$0.00'),
                 remaining_payable: Dinero(inv.partAnchorInvoices.partialAmount).toFormat('$0.00'),
             };
         });
     }

    const getreceivabledata = () => {
        return tier1payablereceivable.map(inv => {
             return {
                 invoice: inv.tier2Invoice.invoiceId,
                 payer: "Maruti", //TODO(Priyanshu)
                 invoice_date: inv.tier2Invoice.invoiceDate.slice(0,10),
                 receivable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat('$0.00'),
                 discounted_amount: Dinero(inv.discountedAmount).toFormat('$0.00'),
                 remaining_receivable: Dinero(inv.tier2Invoice.receivableAmount).subtract(Dinero(inv.discountedAmount)).toFormat('$0.00'),
             };
         });
    }


    // TODO (Priyanshu) Need to complete this
    const removepayableentry = () => {
        const anchortoremove =  tier1payablereceivable.find((element) => {
            return element.partAnchorInvoices.anchorInvoice.invoiceId === invoicetoremove;
        });

        var index = tier1payablereceivable.indexOf(anchortoremove);
        if (index > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
            tier1payablereceivable.splice(index, 1);
        }
        console.log(tier1payablereceivable);
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
                rowData={getpayabledata()}
                rowSelection="multiple"
                domLayout='autoHeight'
            />
    </div>
    <div class="modal" id="modal"  >
            <div class="modal-background" onClick={closemodal}></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Confirmation</p>
                <button class="delete" aria-label="close" onClick={closemodal} ></button>
                </header>
                <section class="modal-card-body">
                 <p>Are you sure you have completed the payment?</p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={removepayableentry} >Confirm</button>
                    <button class="button is-danger" onClick={closemodal} >Decline</button>
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
                rowData={getreceivabledata()}
                rowSelection="multiple"
                domLayout='autoHeight'
            />
    </div>
    <div class="modal" id="modal2"  >
            <div class="modal-background" onClick={closemodal2}></div>
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">Confirmation</p>
                <button class="delete" aria-label="close" onClick={closemodal2} ></button>
                </header>
                <section class="modal-card-body">
                 <p>Are you sure you have updated in your database?</p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={closemodal2} >Confirm</button>
                    <button class="button is-danger" onClick={closemodal2} >Decline</button>
                </footer>
            </div>
        </div>
    </div>
    );

}

export default Tier1DataUpdate;
