import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import { accountSelector } from '../../store/selectors'

class Navbar extends Component {
  render() {
    return (
      <header className="p-nav"> 
        <nav className="p-nav-p">
          <a className="navbar-brand" href="/Exchange">SMAR Token Exchange</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="p-nav-l"></div>
          <div className="p-nav-s" />
          <div className="p-nav-b">
            <ul>
              <li><NavLink exact activeClassName="current" to="/">Exchange</NavLink></li>
              <li><NavLink exact activeClassName="current" to="/Errr">Help</NavLink></li>
              <li><a href="https://smar-portfolio.on.fleek.co/">Portfolio</a></li>
            </ul>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a
                className="nav-link small"
                href={`https://ropsten.etherscan.io/address/${this.props.account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {this.props.account}
              </a>
            </li>
          </ul>
          <div className="spacer">

          </div>
          <ul className="navbar-nav px-3 text-white">
            { ! this.props.account && ! this.props.loading
              ? <div className="row text-center text-monospace">
                  <button
                    type="submit"
                    onClick={(e) => this.props.on(e)}
                    className="btn btn-outline-success btn-sm"
                    style={{ width: '125px', fontSize: '17px'}}
                    ><b>Connect</b>
                  </button>&nbsp;
                </div>
              : ! this.props.account && this.props.loading
                ? <div className="row text-center text-monospace">
                    <button
                      type="submit"
                      className="btn btn-outline-success btn-sm"
                      style={{ width: '125px', fontSize: '17px'}}
                      disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="sr-only">Loading...</span>
                    </button>&nbsp;
                  </div>
                : <div className="row text-center text-monospace">
                    <button
                      type="submit"
                      onClick={(e) => this.props.off(e)}
                      className="btn btn-outline-danger btn-sm"
                      style={{ width: '125px', fontSize: '17px'}}
                      >Disconnect
                    </button>&nbsp;
                  </div>
            }
          </ul>
        </nav>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(Navbar)
