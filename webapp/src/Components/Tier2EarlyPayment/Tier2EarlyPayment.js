import React from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import './Tier2EarlyPayment.scss';
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import BtnCellRenderer2 from "./BtnCellRenderer2.jsx";
import BtnCellRenderer3 from "./BtnCellRenderer3.jsx";


const Tier2EarlyPayment = () => {
    const columnDefs = [
        {   headerName:"Invoice Number",
            field: "invoice",
        },
        {   headerName:"Payee",
            field: "payee",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 130,
            sortable:true
        },
        {   headerName:"Payment Date",
            field: "payment_date",
            minWidth: 130,
            sortable:true
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 180
        },
        {   headerName:"Discount Rate (for Period)",
            field: "discount_rate",
            minWidth: 200
        },
        {   headerName:"Early Payment Amount",
            field: "payment_amount",
            minWidth: 200,
            sortable:true
        },
        {   
            headerName:"Take Early Payment",
            field: "early_payment",
            minWidth: 180,
            cellRenderer: "btnCellRenderer1",
            cellRendererParams: {
              clicked: function(field) {
                  // alert(`${field} was clicked`);
                  document.getElementById('modal').style.display = "flex";
              }
            }
        }
      ]

      const columnDefs2 = [
        {   headerName:"Invoice Number",
            field: "invoice",
            sortable:true
        },
        {   headerName:"Payee",
            field: "payee",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Remark",
            field: "remark",
          
        },
        {   headerName:"Reupload Invoice",
            field: "reupload",
            minWidth: 150,
            cellRenderer: "btnCellRenderer2"
        }
      ]

      const columnDefs3 = [
        {   headerName:"Invoice Number",
            field: "invoice",
            sortable:true
        },
        {   headerName:"Payee",
            field: "payee",
            minWidth: 200
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Date of Upload",
            field: "date_upload",
          
        },
        {   headerName:"Send reminder",
            field: "send_reminder",
            minWidth: 150,
            cellRenderer: "btnCellRenderer3"
        }
      ]

    const defaultColDef = {
        flex: 2,
        minWidth: 150,
        sortable:true,
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
    const frameworkComponents3 =  {
        btnCellRenderer3: BtnCellRenderer3
    }

    const rowData =  [ 
        {   invoice: "KEINV1234",
            payee: "Shayam International",
            invoice_amount: "₹30,000", 
            payment_date: "03/02/2021",
            receivable_amount: "₹30,000",
            discount_rate: "2.66%",
            payment_amount:"₹29,200"
        },
        {   invoice: "ASINV4963",
            payee: "Metalmen Auto",
            invoice_amount: "₹80,000", 
            payment_date: "07/02/2021",
            receivable_amount: "₹80,000",
            discount_rate: "2.88%",
            payment_amount:"₹77,696"
        },
        {   invoice: "DFINV9727",
            payee: "Metalmen Auto",
            invoice_amount: "₹70,000", 
            payment_date: "12/02/2021",
            receivable_amount: "₹70,000",
            discount_rate: "2.27%",
            payment_amount:"₹68,411"
        },
        {   invoice: "CVINV3357",
            payee: "Swift Works",
            invoice_amount: "₹10,000", 
            payment_date: "17/02/2021",
            receivable_amount: "₹10,000",
            discount_rate: "2.66%",
            payment_amount:"₹9,725"
        },
        {   invoice: "RTINV6290",
            payee: "Auto Wondor",
            invoice_amount: "₹50,000",
            payment_date: "18/02/2021",
            receivable_amount: "₹50,000",
            discount_rate: "2.92%",
            payment_amount:"₹48,540"
        },
        {   invoice: "SWINV7714",
            payee: "Swift Works",
            invoice_amount: "₹60,000", 
            payment_date: "22/02/2021",
            receivable_amount: "₹60,000",
            discount_rate: "2.54%",
            payment_amount:"₹58,476"
        },
        {   invoice: "XCINV8470",
            payee: "Swift Works",
            invoice_amount: "₹40,000", 
            payment_date: "20/02/2021",
            receivable_amount: "₹40,000",
            discount_rate: "2.79%",
            payment_amount:"₹38,884"
        }
    ]

    const rowData2 =  [ 
        {   invoice: "HERO54286",
            payee: "Hero Motercycle",
            invoice_amount: "₹20,000",
            remark: "debit note details not added"
        }
    ]

    const rowData3 =  [ 
        {   invoice: "SWINV7714",
            payee: "Swift Works",
            invoice_amount: "₹10,000",
            date_upload: "02/02/2021"
        }
    ]

    const onGridReady = params => {
        // const gridApi = params.api;
        // const gridColumnApi = params.columnApi;

    };

    const closemodal = () => {
      document.getElementById('modal').style.display = "none";
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
                <a class="navbar-item" href="/tier2/early">
                Early Payment 
                </a>
                <a class="navbar-item" href="/tier2/consolidated">
                Consolidated View
                </a>
                <a class="navbar-item" href="/tier2/upload">
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
        <p className="title has-text-info tier-2-action">Kamal enterprise early payment pipeline</p>
        <button className="button is-success is-outlined notification"><span className="icon"><i className="fas fa-bell"></i></span><span>Notification</span></button>
        {/* <div className="total-benefit has-background-info">Total Benefit: ₹10000</div> */}
    </div>

    <div class="tabs is-boxed">
            <ul>
                <li className="is-active" onClick={displaytab1} id="tab-1">
                    <a><span>Invoices approved by tier 1</span></a>
                </li>
                <li  onClick={displaytab2} id="tab-2">
                    <a><span>Invoices rejected by tier 1</span></a>
                </li>
                <li  onClick={displaytab3} id="tab-3">
                    <a><span>Invoices where approval is pending with tier 1</span></a>
                </li>
            </ul>
    </div>

    {/* <div className="table-info has-background-info invoice-approved" >Invoices approved by tier 1</div> */}
    <div id="table-1">
        <div  className="ag-theme-material mygrid">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents1}
            onGridReady={onGridReady}
            rowData={rowData}
            domLayout='autoHeight'
            rowClassRules={{
                'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
            }}
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
                 <p>Are you sure you have taken early payment?</p>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={closemodal} >Confirm</button>
                    <button class="button is-danger" onClick={closemodal} >Decline</button>
                </footer>
            </div>
        </div>
        <div  className="dont-like"><small>Don’t like the discounting rates? Check back again later</small></div>
    </div>
    {/* <div className="table-info has-background-info invoice-approved" >Invoices rejected by tier 1</div> */}
    <div className="ag-theme-material mygrid" id="table-2" style={{display:"none"}}>
          <AgGridReact
            columnDefs={columnDefs2}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents2}
            onGridReady={onGridReady}
            rowData={rowData2}
            domLayout='autoHeight'
            // rowClassRules={{
            //     'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
            // }}
          />
    </div>

    {/* <div className="table-info has-background-info invoice-approved" style={{width: "435px"}}>Invoices where approval is pending with tier 1</div> */}
    <div className="ag-theme-material mygrid" id="table-3" style={{display:"none"}}>
          <AgGridReact
            columnDefs={columnDefs3}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents3}
            onGridReady={onGridReady}
            rowData={rowData3}
            domLayout='autoHeight'
          />
    </div>
 
    </div>
    );

}

export default Tier2EarlyPayment;
