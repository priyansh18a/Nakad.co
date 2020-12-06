import React from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {  AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import '../Tier2EarlyPayment/Tier2EarlyPayment.scss';
import CheckboxRenderer from "./CheckboxRenderer.jsx";



const Tier1Consolidated = () => {
    const history = useHistory();
    const columnDefs = [
        {   headerName:"Invoice",
            field: "invoice",
        },
        {   headerName:"Payer",
            field: "payer",
            minWidth: 200
        },
        {   headerName:"Invoice Date",
            field: "invoice_date",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Receivable Date",
            field: "receivable_date",
            minWidth: 180,
            sortable:true
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 180
        },
        {   headerName: "Receivable Amount",
            field: "receivable_amount",
            minWidth: 200
        },
        {   headerName:"New receivable amount (post discounting)",
            field: "new_receivable",
            minWidth: 230,
            sortable:true
        },

      ]

    const columnDefs2 = [
        {   headerName:"Invoice Number",
            field: "invoice",
            sortable:true
        },
        {   headerName:"Vendor",
            field: "vendor"
        },
        {   headerName:"Payable Date",
            field: "payable_date",
            minWidth: 170,
            sortable:true
        },
        {   headerName:"Buffer Days",
            field: "buffer_days",
            minWidth: 150
        },
        {   headerName:"Payable Amount",
            field: "payable_amount",
            minWidth: 180,
            sortable:true
        },
        {   headerName:"Amount Discounted",
            field: "amount_discounted",
            minWidth: 200
        },
        {   headerName:"New payable (post discounting)",
            field: "new_payable",
            minWidth: 230
        }
      ]

    const columnDefs3 = [
        {   headerName:"Invoice",
            field: "invoice",
            sortable:true
        },
        {   headerName:"Vendor",
            field: "vendor"
        },
        {   headerName:"Invoice Date",
            field: "invoice_date",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Payable Date",
            field: "payable_date",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 180,
            sortable:true
        },
        {   headerName:"Payable Amount",
            field: "payable_amount",
            minWidth: 180,
            sortable:true
        },
        {   headerName:"Approval Date",
            field: "approval_date",
            minWidth: 180
        },
        {   headerName:"Disapprove",
            field: "disapprove",
            minWidth: 150,
            cellRenderer: "checkboxRenderer"
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
            payer: "Shayam International",
            invoice_date: "03/11/2020", 
            receivable_date: "03/02/2021",
            invoice_amount: "₹70,000",
            receivable_amount: "₹30,000",
            new_receivable: "₹40,000"
        }
    ]

    const rowData2 =  [ 
        {   invoice: "KEINV1234",
            vendor: "Maruti",
            payable_date: "03/01/2021",
            buffer_days: "10",
            payable_amount: "₹80,000",
            amount_discounted: "₹20,000",
            new_payable: "₹60,000"
        }
    ]

    const rowData3 =  [ 
        {   invoice: "KEINV1234",
            vendor: "Maruti",
            invoice_date: "03/12/2020", 
            payable_date: "03/02/2021",
            invoice_amount: "₹70,000",
            payable_amount: "₹30,000",
            approval_date: "10/01/2021"
        }
    ]

    const onGridReady = params => {
        // const gridApi = params.api;
        // const gridColumnApi = params.columnApi;

    };

    const closemodal = () => {
      document.getElementById('modal').style.display = "none";
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
        <p className="title has-text-info tier-2-action" style={{marginBottom:"40px"}}>Shyam International</p>
        {/* <div className="total-benefit has-background-info">Total Benefit: ₹10000</div> */}
    </div>

    <div class="tabs is-boxed">
            <ul>
                <li className="is-active" onClick={displaytab1} id="tab-1">
                    <a><span>Receivables invoices for which Loan taken by Tier 2</span></a>
                </li>
                <li  onClick={displaytab2} id="tab-2">
                    <a><span>Payables invoices for which Loan taken by Tier 2</span></a>
                </li>
                <li  onClick={displaytab3} id="tab-3">
                    <a><span>Tier 2 Invoices approved</span></a>
                </li>
            </ul>
    </div>

    {/* <div className="table-info has-background-info invoice-approved" style={{ width: "390px", marginTop: "15px", marginBottom: "15px"}}>Invoices for which Loan taken by Tier 2</div> */}
    {/* <div className="container has-background-grey-dark payables"   style={{width: "124px"}}>Receivables</div> */}
        <div  className="ag-theme-material mygrid"  id="table-1">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents}
            onGridReady={onGridReady}
            rowData={rowData}
            domLayout='autoHeight'
            rowClassRules={{
                'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
            }}
          />
        </div>
    {/* <div className="container has-background-grey-dark payables">Payables</div> */}
        <div className="ag-theme-material mygrid" id="table-2" style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
                rowData={rowData2}
                domLayout='autoHeight'
                rowClassRules={{
                    'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
                }}
            />
        </div>
    {/* <div className="table-info has-background-info invoice-approved" >Tier 2 Invoices approved</div> */}
    <div>
        <div className="ag-theme-material mygrid" id="table-3" style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs3}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents}
                onGridReady={onGridReady}
                rowData={rowData3}
                rowSelection="multiple"
                domLayout='autoHeight'
                rowClassRules={{
                    'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
                }}
            />
        </div>
        <div class="modal" id="modal">
                <div class="modal-background" onClick={closemodal}></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                    <p class="modal-card-title">Confirmation</p>
                    <button class="delete" aria-label="close" onClick={closemodal} ></button>
                    </header>
                    <section class="modal-card-body">
                    <p>Are you sure you have taken Total Early Payment?</p>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" onClick={closemodal} >Confirm</button>
                        <button class="button is-danger" onClick={closemodal} >Decline</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>

    );

}

export default Tier1Consolidated;
