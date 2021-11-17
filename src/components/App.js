import React, { Component } from 'react'
import './App.css'
//import Navbar from './Navbar'
//import Content from './Content'
import MultiSelect from './MultiSelect'
//import Errr from './Errr'
import { connect } from 'react-redux'
// import {
//  loadWeb3,
//  loadAccount,
//  loadToken,
//  loadExchange
// } from '../store/interactions'

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <MultiSelect />    
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
 }
}

export default connect(mapStateToProps)(App)
