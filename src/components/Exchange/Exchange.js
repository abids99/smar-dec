import React, { Component } from 'react'
import { getChain } from 'evm-chains'
import Web3Modal from 'web3modal'
import '../App.css'
import Navbar from './Navbar'
import Content from './Content'
import Errr from './Errr'
import Web3 from 'web3'
import { connect } from 'react-redux'
import {
 loadWeb3,
 loadAccount,
 loadToken,
 loadExchange
} from '../../store/interactions'
import { contractsLoadedSelector } from '../../store/selectors'


class Exchange extends Component {
  async componentDidMount() {
    this.loadBlockchainData(this.props.dispatch)
    await this.init()
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })
    window.ethereum.on('chainChanged', function (chainId) {
      window.location.reload();
    })
    window.ethereum.on('transactionHash', function (networkId) {
      window.location.reload();
    })
  }

  async loadBlockchainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    await loadAccount(web3, dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) {
      //window.alert('Token smart contract not detected on the current network. Please select another network with Metamask.S')
      return
    }    
    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) {
      window.alert('Exchange smart contract not detected on the current network. Please select another network with Metamask.')
      return
    }
  }

  async init() {
    // Declare WalletConnect
    const providerOptions = {
      
    };

    var web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
      disableInjectedProvider: false, // Declare MetaMask
    });

    this.setState({web3Modal: web3Modal})

    //Settings for only MetaMask
    if(typeof window.ethereum!=='undefined'){
      let /*network, balance,*/ web3

      window.ethereum.autoRefreshOnNetworkChange = false;
      web3 = new Web3(window.ethereum)
      this.setState({web3: web3})
    }
  }

  /**
    * "Connect" button, selecting provider via Web3Modal
  */ 
  async on(event) {
    event.preventDefault()

    // Restore provider session
    await this.state.web3Modal.clearCachedProvider();
    let provider, account, network, balance, web3
    
    try {      
      // Activate windows with providers (MM and WC) choice
      provider = await this.state.web3Modal.connect();
      console.log('Provider: ', provider)

      this.setState({ loading: true, provider: null }) 

      if(provider.isMetaMask){ // When MetaMask was chosen as a provider
        account = provider.selectedAddress
        network = await getChain(parseInt(provider.chainId, 16))
        web3 = new Web3(provider)
        balance = await web3.eth.getBalance(provider.selectedAddress)
        window.location.reload();
      } else {
        window.alert('Error, provider not recognized')
      }

      this.setState({
        web3: web3,
        loading: false,
        account: account,
        balance: balance,
        provider: provider,
        network: network.network
      })

    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  }

  /**
    * Disconnect button
   */
  async off(event) {
    event.preventDefault()

    if(this.state.provider===null || typeof this.state.provider==='undefined'){
      window.alert('Logout on MetaMask') // Inform to disconnect from MetaMask
    }
    else {
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: null,
      balance: null,
      network: null,
      provider: null,
      loading: false,
    }

    this.on = this.on.bind(this)
    this.off = this.off.bind(this)
  }


  render() {
    return (
      <div>
        <Navbar
          on={this.on}
          off={this.off}
          account={this.state.account}
          loading={this.state.loading}
        />&nbsp;
        { this.props.contractsLoaded ? <Content /> : <Errr /> }        
      </div>
    );
  }
}

function mapStateToProps(state) {
  const contractsLoaded = contractsLoadedSelector(state)

  return {
    contractsLoaded
 }
}

export default connect(mapStateToProps)(Exchange)
