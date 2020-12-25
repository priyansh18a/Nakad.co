import React,  { useState} from 'react';
import {  AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import '../Tier2EarlyPayment/Tier2EarlyPayment.scss';
import Dinero from "dinero.js";
import BtnCellRenderer from "./BtnCellRenderer";
import {formatDate} from "../../Utils/DateUtils";



const Tier2Consolidated = () => {
    const [tier2adjustmentpending, setTier2adjustmentpending] = useState([]);
    const [tier2adjustmentdone, setTier2adjustmentdone] = useState([]);
    const [anchortier2mappingtoupdate,  setAnchortier2mappingtoupdate] = useState('');

    const columnDefs = [
        {   headerName:"Invoice Number",
            field: "invoice",
            minWidth: 150
        },
        {   headerName:"Payee",
            field: "payee",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150
        },
        {   headerName:"Payment Date (as on invoice)",
            field: "payment_date",
            minWidth:180
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 180
        },
        {   headerName:"Early Payment Amount",
            field: "early_payment_amount",
            minWidth: 200
        },
        {   headerName:"Date of Early Payment",
            field: "early_payment_date",
            minWidth: 200
        },

        {   headerName:"Adjusted in Tally",
            field: "details",
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
        {   headerName:"Invoice Number",
            field: "invoice"
        },
        {   headerName:"Payee",
            field: "payee",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150
        },
        {   headerName:"Payment Date (as on invoice)",
            field: "payment_date",
            minWidth: 200
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 200
        },
        {   headerName:"Date of Early Payment",
            field: "early_payment_date",
            minWidth: 200
        }
      ]

    const defaultColDef = {
        minWidth: 150,
        sortable:true,
        flex: 1,
        filter: true,
        resizable: true,
        wrapText: true,
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

    const frameworkComponents =  {
            btnCellRenderer1: BtnCellRenderer
            
    }



    const onGridReady = params => {
        axios.get("/api/ListTier2EarlyPaymentReceived?tier2Id=2") // TODO(Priyanshu)
        .then(function (response) { 
            const adjustmentpending = response.data.filter(element => {
                return element.tier2Entry === "Pending";
            });  
            const rowdata1 =  adjustmentpending.map(inv => {
                return {
                    invoice: inv.tier2Invoice.invoiceId,
                    payee: "Maruti", //TODO(Priyanshu)
                    invoice_amount: Dinero(inv.tier2Invoice.invoiceAmount).toFormat('$0,0'),
                    payment_date: formatDate(inv.tier2Invoice.dueDate),
                    receivable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat('$0,0'),
                    early_payment_amount: Dinero(inv.discountedAmount).toFormat('$0,0'),
                    early_payment_date: formatDate(inv.tier2Invoice.lastUpdateTimestamp),  //TODO(Priyanshu)  Need to update this
                    details: [inv.tier2Invoice.invoiceId, inv.partAnchorInvoices.anchorInvoice.invoiceId]
                };
            });
            setTier2adjustmentpending(rowdata1);
            const adjustmentdone = response.data.filter(element => {
                return element.tier2Entry === "Done";
            });  
            const rowdata2 =  adjustmentdone.map(inv => {
                return {
                    invoice: inv.tier2Invoice.invoiceId,
                    payee: "Maruti", //TODO(Priyanshu)
                    invoice_amount: Dinero(inv.tier2Invoice.invoiceAmount).toFormat('$0,0'),
                    payment_date: formatDate(inv.tier2Invoice.dueDate),
                    receivable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat('$0,0'),
                    early_payment_date: formatDate(inv.tier2Invoice.lastUpdateTimestamp),  
                };
            });
            setTier2adjustmentdone(rowdata2);
        });
    };

    const tallyadjustmentdone = () => {
        const newRowData = tier2adjustmentpending.filter(element => {
            return element.invoice !== anchortier2mappingtoupdate[0];
        });
        setTier2adjustmentpending(newRowData);
        const newRowData2 = tier2adjustmentpending.find(element => {
            return element.invoice === anchortier2mappingtoupdate[0];
        });
        setTier2adjustmentdone([...tier2adjustmentdone, newRowData2]);
        document.getElementById('modal').style.display = "none";
        axios.post("/api/UpdateTier2EarlyPaymentReceived", {
            anchorInvoiceId:anchortier2mappingtoupdate[1],
            tier2InvoiceId:anchortier2mappingtoupdate[0],
            tier2Entry:"Done"
        }) 
        .then(function (response) { 
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const onGridReady2 = params => {
    }

    const closemodal = () => {
        document.getElementById('modal').style.display = "none";
    }

    const displaypending = () => {
        document.getElementById("adjustment-pending").style.display = "block";
        document.getElementById("adjustment-done").style.display = "none";
        document.getElementById("list-pending").classList.add("is-active");
        document.getElementById("list-done").classList.remove("is-active");
    }

    const displaydone = () => {
        document.getElementById("adjustment-pending").style.display = "none";
        document.getElementById("adjustment-done").style.display = "block";
        document.getElementById("list-pending").classList.remove("is-active");
        document.getElementById("list-done").classList.add("is-active");

    }
    
    return (
    <div>
        <nav className="navbar is-info" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} width="150" alt="" />
                </a>
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
    
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                    <a className="navbar-item" href="/tier2/early">
                    Early Payment 
                    </a>
                    <a className="navbar-item" href="/tier2/consolidated">
                    Consolidated View
                    </a>
                    <a className="navbar-item" href="/tier2/upload">
                    Upload Invoice
                    </a>
                    <a className="navbar-item" href="/tier2/account">
                    Account 
                    </a>
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary is-light">
                                Log Out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
       
        <div className="actiontop">
            <p className="title has-text-info tier-2-action" style={{marginBottom:"40px"}}>Kamal enterprise consolidated view</p>
        </div>

        <div className="tabs is-boxed">
            <ul>
                <li className="is-active" onClick={displaypending} id="list-pending">
                    <a><span>Early payment received but Tally adjustment pending</span></a>
                </li>
                <li  onClick={displaydone} id="list-done">
                    <a><span>Early payment received but Tally adjustment done</span></a>
                </li>
            </ul>
        </div>
        {/* <div className="table-info has-background-info invoice-approved" style={{width: "484px", marginTop:"10px"}}>Early payment received but Tally adjustment pending</div> */}
        <div  className="ag-theme-material mygrid" id="adjustment-pending">
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents}
                onGridReady={onGridReady}
                rowData={tier2adjustmentpending}
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
                 <p>Are you sure you have done tally adjustment?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={tallyadjustmentdone} >Confirm</button>
                    <button className="button is-danger" onClick={closemodal} >Decline</button>
                </footer>
            </div>
        </div>
        <div className="ag-theme-material mygrid"  id="adjustment-done" style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady2}
                rowData={tier2adjustmentdone}
                domLayout='autoHeight'
            />
        </div>
    </div>
    );

}

export default Tier2Consolidated;
