import React from 'react';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import '../Tier2EarlyPayment/Tier2EarlyPayment.scss';
import CheckboxRenderer from "./CheckboxRenderer.jsx";




const Tier2Consolidated = () => {
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
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Payment Date (as on invoice)",
            field: "payment_date",
            minWidth:180,
            sortable:true
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 180
        },
        {   headerName:"Early Payment Amount",
            field: "payment_amount",
            minWidth: 200
        },
        {   headerName:"Date of Early Payment",
            field: "early_payment",
            minWidth: 200,
            sortable:true
        },

        {   headerName:"Adjusted in Tally",
            field: "tally_adjusted",
            cellRenderer: "checkboxRenderer"
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
        {   headerName:"Payment Date (as on invoice)",
            field: "payment_date",
            minWidth: 200,
            sortable:true
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 200
        },
        {   headerName:"Date of Early Payment",
            field: "early_payment",
            minWidth: 200,
            sortable:true
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

    const frameworkComponents =  {
        checkboxRenderer: CheckboxRenderer 
    }

    const rowData =  [ 
        {   invoice: "KEINV1234",
            payee: "Shayam International",
            invoice_amount: "₹30,000", 
            payment_date: "03/02/2021",
            receivable_amount: "₹30,000",
            payment_amount:"₹29,200",
            early_payment:"03/02/2021"
        }
    ]

    const rowData2 =  [ 
        {   invoice: "OEMINV1234",
            payee: "Maruti",
            invoice_amount: "₹40,000", 
            payment_date: "03/07/2020",
            receivable_amount: "₹30,000",
            payment_amount:"₹29,200",
            early_payment:"03/10/2020"
        }
    ]

    const onGridReady = params => {
        // const gridApi = params.api;
        // const gridColumnApi = params.columnApi;

    };

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
            <p className="title has-text-info tier-2-action" style={{marginBottom:"40px"}}>Kamal enterprise consolidated view</p>
        </div>

        <div class="tabs is-boxed">
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
                rowData={rowData}
                rowSelection="multiple"
                domLayout='autoHeight'
            />
        </div>  
        <div className="ag-theme-material mygrid"  id="adjustment-done" style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                rowData={rowData2}
                domLayout='autoHeight'
            />
        </div>
    </div>
    );

}

export default Tier2Consolidated;
