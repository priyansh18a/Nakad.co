import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import axios from 'axios';
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import BtnCellRenderer from "./BtnCellRenderer.jsx";
import invoice from '../../Graphics/invoice.jpeg'
import logo from './../../Graphics/logo.jpg';
import './Tier1Action.scss';
import Dinero from "dinero.js";


const Tier1Action = () => {
    const history = useHistory();
    const [tier2actiondata, setTier2actiondata] = useState([]);
    const [invoicetoupdate, setInvoicetoupdate] = useState('');
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
            field: "invoice",
            cellRenderer: "btnCellRenderer",
            cellRendererParams: {
              clicked: function(field) {
                  console.log(field);
                  setInvoicetoupdate(field);
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

     

    const onGridReady = params => {
        axios.get("/api/ListTier2InvoicesForApproval?tier1Id=1") // TODO(Priyanshu)
        .then(function (response) {
            setTier2actiondata(response.data);         
        })
        .catch(function (error) {
            history.push({
                pathname: "/tier1",
                state: { alert: "true" }
            });
            console.log(error);
        })
    };

    const changeapprovedstatus = () => {
        const tier2invoice =  tier2actiondata.find((element) => {
            return element.invoiceId === invoicetoupdate;
        })
        tier2invoice.approvalStatus = "Approved";
        console.log(tier2invoice);
        callapi(tier2invoice);
    }

    const callapi = tier2invoice => {
        axios.post("/api/UpdateTier2InvoiceForApproval", tier2invoice)
          .then(function (response) {
            console.log(response);
            window.location.reload(); 
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    const closemodal = () => {
        document.getElementById('modal').style.display = "none";
    }


    const getrowdata = () => {
       return tier2actiondata.map(inv => {
            return {
                invoice: inv.invoiceId,
                vendor: inv.tier2.actorinfo.name,
                invoice_date: inv.invoiceDate,
                payable_date: inv.dueDate,
                invoice_amount: Dinero(inv.invoiceAmount).toFormat('$0.00'),
                payable_amount: Dinero(inv.receivableAmount).toFormat('$0.00')
            };
        });
    }

    const logout = () => {
        axios.get('/logout')
        .then(function (response) {
            history.push("/");
        })
        .catch(function (error){
            // handle error
            console.log(error);
        })
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
                rowData={getrowdata()}
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
                <button class="button is-success" onClick={changeapprovedstatus}>Approve</button>
                <button class="button is-danger" onClick={closemodal} >Decline</button>
                </footer>
            </div>
            </div>
        </div>
        </div>
    );
    

}

export default Tier1Action;
