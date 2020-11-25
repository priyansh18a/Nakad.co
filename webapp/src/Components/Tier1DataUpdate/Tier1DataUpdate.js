import React from 'react';
import {AgGridReact } from 'ag-grid-react';
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import CheckboxRenderer from "./CheckboxRenderer.jsx";
import logo from './../../Graphics/logo.jpg';
import './Tier1DataUpdate.scss';


const Tier1DataUpdate = () => {
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
            field: "cofirm",
            minWidth: 150,
            cellRenderer: "checkboxRenderer"
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
            cellRenderer: "checkboxRenderer",
           
        }
    ]

    const rowData1 = [
       {   invoice: "KEINV1234",
            vendor: "Kamal Enterprises", 
            invoice_date: "3/11/2020",
            payable_amount: "₹30,000",
            discounted_amount: "₹30,000",
            remaining_payable: "₹0"
        },
        {   invoice: "DFINV9727",
            vendor: "Abhinav Traders", 
            invoice_date: "18/11/2020",
            payable_amount: "₹20,000",
            discounted_amount: "₹20,000",
            remaining_payable: "₹0"
        },
        {   invoice: "RTINV6290",
            vendor: "UMEX", 
            invoice_date: "22/11/2020",
            payable_amount: "₹80,000",
            discounted_amount: "₹80,000",
            remaining_payable: "₹0"
        },
        {   invoice: "SWINV7714",
            vendor: "Jai Bhavani Auto", 
            invoice_date: "20/11/2020",
            payable_amount: "₹60,000",
            discounted_amount: "₹60,000",
            remaining_payable: "₹0"
        }
    ]

    const rowData2 = [
        {   invoice: "OEMINV1234",
            payer: "OEM-1",
            invoice_date: "6/11/2020",
            receivable_amount: "₹100,000",
            discounted_amount: "₹30,000",
            remaining_receivable: "₹70,000"
        },
        {   invoice: "OEMINV9727",
            payer: "OEM-1",
            invoice_date: "17/11/2020",
            receivable_amount: "₹120,000",
            discounted_amount: "₹20,000",
            remaining_receivable: "₹100,000"
        },
        {   invoice: "OEMINV7714",
            payer: "OEM-1",
            invoice_date: "18/11/2020",
            receivable_amount: "₹130,000",
            discounted_amount: "₹80,000",
            remaining_receivable: "₹50,000"
        },
        {   invoice: "OEMINV3357",
            payer: "OEM-2",
            invoice_date: "22/11/2020",
            receivable_amount: "₹80,000",
            discounted_amount: "₹60,000",
            remaining_receivable: "₹20,000"
        },
        {   invoice: "OEMINV6290",
            payer: "OEM-2",
            invoice_date: "20/11/2020",
            receivable_amount: "₹120,000",
            discounted_amount: "₹80,000",
            remaining_receivable: "₹40,000"
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

    const onGridReady = params => {
        // const gridApi = params.api;
        // const gridColumnApi = params.columnApi;

    };

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
            <a className="button is-primary is-light">
                Log Out
            </a>
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

    <div class="tabs is-boxed">
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
                frameworkComponents={frameworkComponents}
                onGridReady={onGridReady}
                rowData={rowData1}
                rowSelection="multiple"
                domLayout='autoHeight'
                rowClassRules={{
                    'highlight': function(params) { return  params.data.invoice === 'KEINV1234'; }
                }}
            />
    </div>
    {/* <div className="container has-background-grey-dark payables" style={{ width: 116, marginTop: "50px"}}>Receivables</div> */}
    <div className="ag-theme-material mygrid" id="receivables"  style={{display:"none"}}>
            <AgGridReact
                columnDefs={columnDefs2}
                defaultColDef={defaultColDef}
                frameworkComponents={frameworkComponents}
                onGridReady={onGridReady}
                rowData={rowData2}
                rowSelection="multiple"
                domLayout='autoHeight'
                rowClassRules={{
                    'highlight': function(params) { return  params.data.invoice === 'OEMINV1234'; }
                }}
            />
    </div>
    </div>
    );

}

export default Tier1DataUpdate;
