import React, { Component } from 'react'
import { HashRouter as Router, Switch, Route,  /*Link*/ } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom'
// import IpfsRouter from 'ipfs-react-router'


import { connect } from 'react-redux'
//import ReactDOM from 'react-dom'
//import { OverlayTrigger, Tooltip, } from 'react-bootstrap'

import Exchange from "./Exchange/Exchange"
import Errr from "./Exchange/Errr"


class MultiSelect extends Component {
  render() {
    return (
      <Router>  
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' component={Exchange}></Route>
          <Route exact path='/Errr' component={Errr}></Route>          
        </Switch>
      </Router>  
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(MultiSelect)