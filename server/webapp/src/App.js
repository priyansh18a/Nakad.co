import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';
import Tier1Login from './Components/Tier1Login/Tier1Login';
import Tier2Login from './Components/Tier2Login/Tier2Login';
import BankLogin from './Components/BankLogin/BankLogin';
import Tier1Action from './Components/Tier1Action/Tier1Action';
import Tier2Upload from './Components/Tier2Upload/Tier2Upload';
import Tier2Account from './Components/Tier2Account/Tier2Account';
import ChooseType from './Components/ChooseType/ChooseType'
import Tier1DataUpdate from './Components/Tier1DataUpdate/Tier1DataUpdate';
import Tier2EarlyPayment from './Components/Tier2EarlyPayment/Tier2EarlyPayment';
import BankCollection from './Components/BankCollection/BankCollection';
import BankDisbursement from './Components/BankDisbursement/BankDisbursement';
import Tier1Consolidated from './Components/Tier1Consolidated/Tier1Consolidated';
import Tier2Consolidated from './Components/Tier2Consolidated/Tier2Consolidated';
import Register from './Components/Register/Register';



const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          <ChooseType/>
        </Route>
        <Route exact path="/register" >
          <Register/>
        </Route>
        <Route exact path="/tier1" >
          <Tier1Login/>
        </Route>
        <Route exact path="/tier1/action" >
          <Tier1Action/>
        </Route>
        <Route exact path="/tier1/consolidated" >
          <Tier1Consolidated/>
        </Route>
        <Route exact path="/tier1/data" >
          <Tier1DataUpdate/>
        </Route>
        <Route exact path="/tier2" >
          <Tier2Login/>
        </Route>
        <Route exact path="/tier2/account" >
          <Tier2Account/>
        </Route>
        <Route exact path="/tier2/consolidated" >
          <Tier2Consolidated/>
        </Route>
        <Route exact path="/tier2/early" >
          <Tier2EarlyPayment/>
        </Route>
        <Route exact path="/tier2/upload" >
          <Tier2Upload/>
        </Route>
        <Route exact path="/bank" >
          <BankLogin/>
        </Route>
        <Route exact path="/bank/collection" >
          <BankCollection/>
        </Route>
        <Route exact path="/bank/disbursement" >
          <BankDisbursement/>
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>

  );
};

export default App;
