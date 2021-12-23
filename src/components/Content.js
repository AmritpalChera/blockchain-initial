import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import { exchangeSelector } from '../store/selectors';
import { loadAllOrders, subscribeToEvents } from '../store/interactions';
import { useDispatch } from 'react-redux';
import Trades from './Trades';
import OrderBook from './OrderBook';
import MyTransactions from './MyTransactions';
import PriceChart from './PriceChart';
import Balance from './Balance'

const Content = (props) => {
  const { exchange } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    loadAllOrders(exchange, dispatch)
    subscribeToEvents(exchange, dispatch)
  }, [])


  
    return (
        <div className="content">
          <div className="vertical-split">
            {/* <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div> */}
          <Balance/>
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div>
          {/* <div className="vertical">
            <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div>
          </div> */}
        <OrderBook/>
          <div className="vertical-split">
            {/* <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
          </div> */}
          <PriceChart/>
            {/* <div className="card bg-dark text-white">
              <div className="card-header">
                Card Title
              </div>
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/#" className="card-link">Card link</a>
              </div>
            </div> */}
          <MyTransactions/>
        </div>
        <Trades/>
          
        </div>
    )
}

function mapStateToProps(state) {
  // console.log("contractsLoadedSelector", contractsLoadedSelector(state))
  return {
    //account: accountSelector(state)
    exchange: exchangeSelector(state)

  }
}

// export default App;
export default connect(mapStateToProps) (Content)

