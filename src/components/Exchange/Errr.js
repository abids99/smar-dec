import React, { Component } from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'


class Errr extends Component {
  render() {
    return (
      <div>
        <Navbar />  
        <div className="content-cus">  
          

        <div className="horizontal-split"> 
            
            <div className="full  bg-light text-dark">
              <div className="center-cus-text">
                1. If Metamask is not installed please install metamask and Login     
              </div>
              <div className="center-button"> 
                <a href="https://metamask.io/" className="button-styling">How to Guide</a>
              </div>
            </div>

            <div className="center-cus-text text-height text-dark">
              if you are seeing this page there might be one of the errors listed below
            </div>

            <div className="full bg-light text-dark">
              <div className="center-cus-text">
                2. if Exchange is not loaded please change to Ropsten Test Network      
              </div>
              <div className="center-button">  
                <a href="https://docs.cargo.build/guides/changing-your-network-with-metamask" className="button-styling">How to Guide</a>
              </div> 
            </div>      
         
          </div>   

        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(Errr)