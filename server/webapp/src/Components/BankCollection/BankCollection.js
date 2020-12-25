import React from 'react';
import {AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import logo from './../../Graphics/logo.jpg';
import './../Tier1DataUpdate/Tier1DataUpdate.scss';
import './../Tier2EarlyPayment/Tier2EarlyPayment.scss';
import BtnCellRenderer from "./BtnCellRenderer";
import invoice from '../../Graphics/invoice.jpeg'


const BankCollection = () => {
    const columnDefs = [
        {   headerName:"Loan number",
            field: "loan_number",
            minWidth: 155,
            maxWidth:200
        },
        {   headerName:"Loan amount",
            field: "loan_amount",
            minWidth: 150
        },
        {   headerName:"Repayment date",
            field: "repayment_date",
            minWidth: 200
        },
        {   headerName:"Linked invoice amount",
            field: "invoice_amount",
            minWidth: 200
        },
        {   headerName:"Invoice Payee",
            field: "invoice_payee",
            minWidth: 180
        },
        {   headerName:"Amount appropriated to bank in Invoice Payee name SAP (Yes/No)",
            field: "amount_bank",
            minWidth: 300
        },
        {   headerName: "Details",
            field: "details",
            cellRenderer: "btnCellRenderer",
            cellRendererParams: {
              clicked: function(field) {
                  // alert(`${field} was clicked`);
                  document.getElementById('modal').style.display = "flex";
              }
            }
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
        btnCellRenderer: BtnCellRenderer
      }

    const rowData =  [ 
        {   loan_number: "1",
            loan_amount: "₹30,000",
            repayment_date: "06/02/2021", 
            invoice_amount: "₹100,000", 
            invoice_payee: "OEM -1",
            amount_bank: "Yes"
        },
        {   loan_number: "2",
            loan_amount: "₹30,000",
            repayment_date: "12/02/2021", 
            invoice_amount: "₹120,000", 
            invoice_payee: "OEM -1",
            amount_bank: "Yes"
        },
        {   loan_number: "3",
            loan_amount: "₹20,000",
            repayment_date: "17/02/2021", 
            invoice_amount: "₹130,000", 
            invoice_payee: "OEM -1",
            amount_bank: "Yes"
        },
        {   loan_number: "4",
            loan_amount: "₹80,000",
            repayment_date: "18/02/2021", 
            invoice_amount: "₹80,000", 
            invoice_payee: "OEM -1",
            amount_bank: "Yes"
        },
        {   loan_number: "5",
            loan_amount: "₹20,000",
            repayment_date: "22/02/2021", 
            invoice_amount: "₹120,000", 
            invoice_payee: "OEM -2",
            amount_bank: "Yes"
        }

    ]

    const onGridReady = params => {
        // const gridApi = params.api;
        // const gridColumnApi = params.columnApi;

    };


    const closemodal = () => {
      document.getElementById('modal').style.display = "none";
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
                <a className="navbar-item" href="/bank/disbursement">
                Disbursement Screen
                </a>
                <a className="navbar-item" href="/bank/collection">
                Collection Screen
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
        <p className="title has-text-info tier-2-action" style={{marginBottom:"20px"}}>Bank collection screen</p>
    </div>
    <div>
        <div  className="ag-theme-material mygrid">
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            frameworkComponents={frameworkComponents}
            onGridReady={onGridReady}
            rowData={rowData}
            domLayout='autoHeight'
            rowClassRules={{
              'highlight': function(params) { return  params.data.loan_number === "1"; }
          }}
          />
        </div>
        <div class="modal" id="modal">
          <div class="modal-background" onClick={closemodal}></div>
          <div class="modal-card"  >
            <header class="modal-card-head">
              <p class="modal-card-title">More Details</p>
              <button class="delete" onClick={closemodal} aria-label="close"></button>
            </header>
            <section class="modal-card-body">
            <p className="has-text-info is-size-4 has-text-weight-bold">Invoice</p>
            <p class="image is-4by3">
              <img src={invoice} alt=""/>
            </p>
            <p className="has-text-info is-size-4 has-text-weight-bold">GRN</p>
            <p class="image is-4by3">
              <img src={invoice} alt=""/>
            </p>
            <p className="has-text-info is-size-4 has-text-weight-bold">Proof of Approval</p>
            <p class="image is-4by3">
              <img src={invoice} alt=""/>
            </p>
            <p className="has-text-info is-size-4 has-text-weight-bold">Debit Note</p>
            <p class="image is-4by3">
              <img src={invoice} alt=""/>
            </p>
            </section>
     
            <footer class="modal-card-foot">
              <button class="button is-success" onClick={closemodal} >Approve</button>
              <button class="button is-danger" onClick={closemodal} >Decline</button>
            </footer>
          </div>
        </div>
    </div>
 
    </div>
    );

}

export default BankCollection;
