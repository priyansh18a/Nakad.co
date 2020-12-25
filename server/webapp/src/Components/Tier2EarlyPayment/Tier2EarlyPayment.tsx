import React , { useState} from 'react';
import { useHistory } from "react-router-dom";
import {  AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import './Tier2EarlyPayment.scss';
import Dinero from "dinero.js";
import {formatDate} from "../../Utils/DateUtils";
import BtnCellRenderer from "./BtnCellRenderer";
import BtnCellRenderer2 from "./BtnCellRenderer2";
import BtnCellRenderer3 from "./BtnCellRenderer3";
import BtnCellRenderer4 from "./BtnCellRenderer4";

const Tier2EarlyPayment = () => {
    const history = useHistory();
    const [checkedbytier1, setCheckedbytier1] = useState([]);
    const [rejectedbytier1, setRejectedbytier1] = useState([]);
    const [pendingbytier1, setPendingbytier1] = useState([]);
    const [invoicetoupdate, setInvoicetoupdate] = useState('');

    const columnDefs1 = [
        {   headerName:"Invoice Date",
            field: "invoice_date",
        },
        {   headerName:"Invoice Number",
            field: "invoice"
        },
        {   headerName:"Customer",
            field: "customer",
            minWidth: 150
        },
        {   headerName:"Net Receivable Amount",
            field: "receivable_amount",
            minWidth: 180
        },
        {   headerName:"Receivable Date",
            field: "receivable_date",
        },
        {   headerName:"Send Reminder",
            field: "invoice",
            minWidth: 150,
            cellRenderer: "btnCellRenderer3"
        },
        {   headerName:"Cancel Early Payment Request",
            field: "invoice",
            minWidth: 180,
            cellRenderer: "btnCellRenderer4",
            cellRendererParams: {
            clicked: function(field) {
                console.log(field);
                setInvoicetoupdate(field);
                document.getElementById('modal2').style.display = "flex";
            }
            }
        }
      ]

    const columnDefs2 = [
        {   headerName:"Invoice Number",
            field: "invoice",
        },
        {   headerName:"Customer",
            field: "customer",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 130
        },
        {   headerName:"Payment Date",
            field: "payment_date",
            minWidth: 130
        },
        {   headerName: "Net Receivable",
            field: "receivable_amount",
            minWidth: 180
        },
        {   headerName:"Early Payment Discount ",
            field: "payment_discount",
            minWidth: 200
        },
        {   headerName:"Early Payment Amount",
            field: "payment_amount",
            minWidth: 200
        },
        {   
            headerName:"Take Early Payment",
            field: "invoice",
            minWidth: 180,
            cellRenderer: "btnCellRenderer1",
            cellRendererParams: {
              clicked: function(field) {
                  console.log(field);
                  setInvoicetoupdate(field);
                  document.getElementById('modal').style.display = "flex";
              }
            }
        }
      ]

      const columnDefs3 = [
        {   headerName:"Invoice Number",
            field: "invoice"
        },
        {   headerName:"Customer",
            field: "customer",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150
        },
        {   headerName:"Remark",
            field: "remark",
            cellClass: "remark-class",
            tooltipField:"remark"
        },
        {   headerName:"Reupload Invoice",
            field: "reupload",
            minWidth: 150,
            cellRenderer: "btnCellRenderer2"
        }
      ]

  

    const defaultColDef = {
        flex: 2,
        minWidth: 150,
        sortable:true,
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
        btnCellRenderer3: BtnCellRenderer3,
        btnCellRenderer4: BtnCellRenderer4
    }

    const frameworkComponents2 =  {
        btnCellRenderer1: BtnCellRenderer 
    }

    const frameworkComponents3 =  {
        btnCellRenderer2: BtnCellRenderer2
    }

 
   

    const onGridReady1 = params => {
        axios.get("/api/ListTier2Invoices?tier1Id=1&approvalStatus=Pending") // TODO(Priyanshu)
        .then(function (response) {
            setPendingbytier1(response.data);         
        })
        .catch(function (error) {
            history.push({
                pathname: "/tier1",
                state: { alert: "true" }
            });
            console.log(error);
        })
    };


    const onGridReady2 = params => {
        axios.get("/api/ListTier2InvoicesForDiscounting?tier1Id=1&tier2Id=2") // TODO(Priyanshu)
        .then(function (response) {
            setCheckedbytier1(response.data);         
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const onGridReady3 = params => {
       axios.get("/api/ListTier2Invoices?tier1Id=1&approvalStatus=Rejected") // TODO(Priyanshu)
        .then(function (response) {
            setRejectedbytier1(response.data);         
        })
        .catch(function (error) {
            console.log(error);
        })

    };


    const getpendingbytier1data = () => {
        return pendingbytier1.map(inv => {
             return {
                 invoice: inv.invoiceId,
                 customer: inv.tier2.actorInfo.name,
                 receivable_amount: Dinero(inv.receivableAmount).toFormat('$0,0'),
                 invoice_date: formatDate(inv.invoiceDate),
                 receivable_date: formatDate(inv.dueDate),
                 payee: inv.tier1.actorInfo.name, 
             };
         });
    }


    
    const getapprovedrowdata = () => {
        return checkedbytier1.map(inv => {
             return {
                 invoice: inv.tier2Invoice.invoiceId,
                 customer: inv.tier2Invoice.tier1.actorInfo.name,
                 payment_date: formatDate(inv.tier2Invoice.dueDate),
                 payment_discount:Dinero(inv.discountedAmount).toFormat('$0,0'),
                 invoice_amount: Dinero(inv.tier2Invoice.invoiceAmount).toFormat('$0,0'),
                 receivable_amount: Dinero(inv.tier2Invoice.receivableAmount).toFormat('$0,0'),
                 payment_amount:Dinero(inv.discountedAmount).toFormat('$0,0')
             };
         });
     }


    const confirmearlypayment = () => {
        const discontedtier2 =  checkedbytier1.find((element) => {
            return element.tier2Invoice.invoiceId === invoicetoupdate;
        });
        discontedtier2.status = "Discounted";        
        callapi(discontedtier2);
    }

    const callapi = discontedtier2 => {
        axios.post("/api/UpdateTier2InvoiceForDiscounting", discontedtier2)
          .then(function (response) {
            console.log(response);
            onGridReady2();
            document.getElementById('modal').style.display = "none";
          })
          .catch(function (error) {
            console.log(error);
          });
    }
 
     // TODO(Priyanshu) Need to confirm to this with Harshil Bhaiya
    const getrejectedrowdata = () => {
            return rejectedbytier1.map(inv => {
                return {
                    invoice: inv.invoiceId,
                    customer: inv.tier1.actorInfo.name,
                    invoice_amount: Dinero(inv.invoiceAmount).toFormat('$0,0'),
                    remark : inv.tier2InvoiceDetails.remark  // TODO(Priyanshu)
                };
            });
     }

    const closemodal = () => {
        document.getElementById('modal').style.display = "none";
        document.getElementById('modal2').style.display = "none";
    }

    const displaytab1 = () => {
        document.getElementById("table-1").style.display = "block";
        document.getElementById("table-2").style.display = "none";
        document.getElementById("table-3").style.display = "none";
        document.getElementById("tab-1").classList.add("is-active");
        document.getElementById("tab-2").classList.remove("is-active");
        document.getElementById("tab-3").classList.remove("is-active");
    }

    const displaytab2 = () => {
        document.getElementById("table-1").style.display = "none";
        document.getElementById("table-2").style.display = "block";
        document.getElementById("table-3").style.display = "none";
        document.getElementById("tab-1").classList.remove("is-active");
        document.getElementById("tab-2").classList.add("is-active");
        document.getElementById("tab-3").classList.remove("is-active");
    }

    const displaytab3 = () => {
        document.getElementById("table-1").style.display = "none";
        document.getElementById("table-2").style.display = "none";
        document.getElementById("table-3").style.display = "block";
        document.getElementById("tab-1").classList.remove("is-active");
        document.getElementById("tab-2").classList.remove("is-active");
        document.getElementById("tab-3").classList.add("is-active");
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
                <button className="button is-primary is-light" >
                    Log Out
                </button>
                </div>
            </div>
            </div>
        </div>
    </nav>
    <div className="actiontop">
        <p className="title has-text-info tier-2-action">Kamal enterprise early payment pipeline</p>
        <button className="button is-success is-outlined notification"><span className="icon"><i className="fas fa-bell"></i></span><span>Notification</span></button>
        {/* <div className="total-benefit has-background-info">Total Benefit: ₹10000</div> */}
    </div>

    <div className="tabs is-boxed">
            <ul>
                <li className="is-active" onClick={displaytab1} id="tab-1">
                    <a><span>Pending with Customer</span></a>
                </li>
                <li onClick={displaytab2} id="tab-2">
                    <a><span> Approved by Customer</span></a>
                </li>
                <li  onClick={displaytab3} id="tab-3">
                    <a><span>Rejected by Customer</span></a>
                </li>
               
            </ul>
    </div>
    <div className="ag-theme-material mygrid" id="table-1" >
          <AgGridReact
            columnDefs={columnDefs1}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents1}
            onGridReady={onGridReady1}
            rowData={getpendingbytier1data()}
            domLayout='autoHeight'
          />
    </div>
    <div className="modal" id="modal2"  >
            <div className="modal-background" onClick={closemodal}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                <p className="modal-card-title">Confirmation</p>
                <button className="delete" aria-label="close" onClick={closemodal} ></button>
                </header>
                <section className="modal-card-body">
                 <p>Are you sure you want to cancel request of early payment?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={closemodal} >Confirm</button>  //TODO(Priyanshu ) what to do set status when he cancel the request for early payment
                    <button className="button is-danger" onClick={closemodal}>Cancel</button>
                </footer>
            </div>
        </div>

    {/* <div className="table-info has-background-info invoice-approved" >Invoices approved by tier 1</div> */}
    <div id="table-2" style={{display:"none"}}>
        <div  className="ag-theme-material mygrid" >
          <AgGridReact
            columnDefs={columnDefs2}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents2}
            onGridReady={onGridReady2}
            rowData={getapprovedrowdata()}
            domLayout='autoHeight'
            rowClassRules={{
                'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
            }}
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
                 <p>Are you sure you want to take early payment?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={confirmearlypayment} >Confirm</button>
                    <button className="button is-danger" onClick={closemodal} >Decline</button>
                </footer>
            </div>
        </div>
        <div  className="dont-like"><small>Don’t like the discounting rates? Check back again later</small></div>
    </div>
    {/* <div className="table-info has-background-info invoice-approved" >Invoices rejected by tier 1</div> */}
    <div className="ag-theme-material mygrid" id="table-3" style={{display:"none"}}>
          <AgGridReact
            columnDefs={columnDefs3}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents3}
            enableBrowserTooltips={true}
            onGridReady={onGridReady3}
            rowData={getrejectedrowdata()}                    
            domLayout='autoHeight'
          />
    </div>

  
 
    </div>
    );

}

export default Tier2EarlyPayment;
