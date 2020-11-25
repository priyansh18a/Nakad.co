import React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import invoice from '../../Graphics/invoice.jpeg'
import logo from './../../Graphics/logo.jpg';
import './Tier1Action.scss';



const Tier1Action = () => {
    const showtablemoreinfo = () => {
        document.getElementById('table-more-info').style.display = "block";
        console.log('it work');
    }

    const hidetablemoreinfo = () => {
        document.getElementById('table-more-info').style.display = "none"; 
    }

    const columnDefs = [
        {   headerName:"Invoice",
            field: "invoice",
            maxWidth: 150
        },
        {   headerName:"Vendor",
            field: "vendor",
            minWidth: 200
        },
        {   headerName:"Invoice Date",
            field: "invoice_date",
            minWidth: 130,
            sortable:true
        },
        {   headerName:"Payable Date",
            field: "payable_date",
            minWidth: 130
        },
        {   headerName:"Invoice Amount",
            field: "invoice_amount",
            minWidth: 150,
            sortable:true
        },
        {   headerName:"Payable Amount",
            field: "payable_amount",
            minWidth: 180
        },
        {   headerName:"Details",
            field: "details",
            cellRenderer: "btnCellRenderer",
            cellRendererParams: {
              clicked: function(field) {
                  // alert(`${field} was clicked`);
                  document.getElementById('modal').style.display = "flex";
              }
            },
            minWidth: 150
        }
      
      ]

    const defaultColDef = {
        flex: 1,
        minWidth: 150,
        sortable:true,
        cellStyle: {color: 'Black'},
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
              '  </div>' +
              '</div>'
          }
    }

    const frameworkComponents = {
        btnCellRenderer: BtnCellRenderer  
 }

    const rowData = [
        {   invoice: "KEINV1234",   
            vendor: "Kamal Enterprises",
            invoice_date: "03/11/2020",
            payable_date: "03/02/2021",
            invoice_amount: "₹30,000",
            payable_amount: "₹30,000"
        },
        {   invoice: "MTINV1987",   
            vendor: "Ramesh metals",
            invoice_date: "07/11/2020",
            payable_date: "07/02/2021",
            invoice_amount: "₹30,000",
            payable_amount: "₹30,000"
        },
        {   invoice: "HUINV2097",   
            vendor: "Indian Welders",
            invoice_date: "12/11/2020",
            payable_date: "12/02/2021",
            invoice_amount: "₹10,000",
            payable_amount: "₹10,000"
        },
        {   invoice: "PRINV4398",   
            vendor: "S.Ram & Sons",
            invoice_date: "17/11/2020",
            payable_date: "17/02/2021",
            invoice_amount: "₹80,000",
            payable_amount: "₹80,000"
        },
        {   invoice: "STINV1098",   
            vendor: "Abhinav Traders",
            invoice_date: "18/11/2020",
            payable_date: "18/02/2021",
            invoice_amount: "₹90,000",
            payable_amount: "₹90,000"
        },
        {   invoice: "BCINV8765",   
            vendor: "UMEX",
            invoice_date: "22/11/2020",
            payable_date: "22/02/2021",
            invoice_amount: "₹50,000",
            payable_amount: "₹50,000"
        },
        {   invoice: "CGINV2743",   
            vendor: "Jai Bhavani Auto",
            invoice_date: "20/11/2020",
            payable_date: "20/02/2021",
            invoice_amount: "₹50,000",
            payable_amount: "₹50,000"
        },
        {   invoice: "MSINV2343",   
            vendor: "Novel Rubber",
            invoice_date: "1/12/2020",
            payable_date: "3/03/2021",
            invoice_amount: "₹30,000",
            payable_amount: "₹30,000"
        },
        {   invoice: "GPINV2132",   
            vendor: "RM pipes",
            invoice_date: "12/12/2020",
            payable_date: "14/03/2021",
            invoice_amount: "₹10,000",
            payable_amount: "₹10,000"
        }
        
    ]
    


    const onGridReady = params => {
        fetch("/ListTier2InvoicesForApproval?tier1Id=1").then(response => {
            response.json().then(data => {
                const newRowData = data.map(inv => {
                    return {
                        invoice: inv.invoiceId,
                        vendor: inv.tier2.actorinfo.name,
                        invoice_date: inv.invoiceDate,
                        payable_date: inv.dueDate,
                        invoice_amount: Dinero(inv.invoiceAmount).toFormat('$0.00'),
                        payable_amount: Dinero(inv.receivableAmount).toFormat('$0.00')
                    };
                });
                this.setState({rowData: newRowData });
            })
        })

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
        <div id="table-more-info" className="has-background-warning"><span className="has-text-info">More Info: </span>Tier 2 requests confirmation of invoice. <br/>Based on this it will discount invoice to get early payment.</div>
        <div className="table-info has-background-info" style={{marginBottom:"20px", width: "300px"}} >Tier 2 Invoices for Approval<span onMouseOver={showtablemoreinfo} onMouseLeave={hidetablemoreinfo} className="moreinfospan"><i className="fas fa-info-circle" ></i></span></div>
        <div>
            <div className="ag-theme-material mygrid">
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
                <div className="field">
                    <div className="control">
                        <label className="label">Remark</label>
                        <textarea className="input" type="text" name="remark" placeholder="Write your remark here(if any)" style={{height:"80px"}}  />
                    </div>
                </div>
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

export default Tier1Action;
