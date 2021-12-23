import React, { useEffect, useState } from 'react';
import './App.css';

import {
  loadWeb3, loadAccount, loadToken,
  loadExchange
} from '../store/interactions';


import { connect, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import Content from './Content';

import {contractsLoadedSelector} from '../store/selectors'


function App(props) {
  const {contractsLoaded} = props;
  
 
  const dispatch = useDispatch();

  //connect to blockchain
  const loadBlockchainData = async (dispatch) => {
    const web3 =  await loadWeb3(dispatch);
    await web3.eth.getChainId();
    const networkId = await web3.eth.net.getId();
    console.log('netowrk id: ', networkId)
    await loadAccount(web3, dispatch);
    // console.log("abi", Token.abi)
    // console.log("address", Token.networks[networkId].address)
    const token = await loadToken(web3, networkId, dispatch)
   
    const exchange = await loadExchange(web3, networkId, dispatch)
    if (!token || !exchange) {
      window.alert('Contract not deployed to current network. Please select another network with Metamask')
    }
    // const totalSupply = await token.methods.totalSupply().call();
    // console.log("total Supply", totalSupply)
  }

  useEffect(() => {
    loadBlockchainData(dispatch);
  }, [])
  
  


  return (

    <div>
      <Navbar/>
        {contractsLoaded? <Content/> : <div className="content"></div> }
     
      </div>
    );
}

function mapStateToProps(state) {
  // console.log("contractsLoadedSelector", contractsLoadedSelector(state))
  return {
    //account: accountSelector(state)
    contractsLoaded: contractsLoadedSelector(state)

  }
}

// export default App;
export default connect(mapStateToProps) (App)
