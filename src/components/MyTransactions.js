import React, { Component } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  myFilledOrdersLoadedSelector,
  myFilledOrdersSelector,
  myOpenOrdersLoadedSelector,
  myOpenOrdersSelector,
  exchangeSelector,
  accountSelector,
  orderCancellingSelector,
} from '../store/selectors';
import { cancelOrder } from '../store/interactions';

const MyTransactions = (props) => {
  const dispatch = useDispatch();

    const showMyFilledOrders = (myFilledOrders) => {
        return(
          <tbody>
            { myFilledOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td className="text-muted">{order.formattedTimestamp}</td>
                  <td className={`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
                  <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
                </tr>
              )
            }) }
          </tbody>
        )
      }
      
      const showMyOpenOrders = (myOpenOrders) => {
        return(
          <tbody>
            { myOpenOrders.map((order) => {
              return (
                <tr key={order.id}>
                  <td className={`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
                  <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
                  <td className="text-muted cancel-order" onClick={(e) => {
                    cancelOrder(dispatch, props.exchange, order, props.account )
                  }}>
                    X
                  </td>
                </tr>
              )
            }) }
          </tbody>
        )
      }

    
    return (
        <div className="card bg-dark text-white">
            <div className="card-header">
            My Transactions
            </div>
            <div className="card-body">
            <Tabs defaultActiveKey="trades" className="bg-dark text-white">
                <Tab eventKey="trades" title="Trades" className="bg-dark">
                <table className="table table-dark table-sm small">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>LEARN</th>
                        <th>LEARN/ETH</th>
                    </tr>
                </thead>
                    { props.showMyFilledOrders ? showMyFilledOrders(props.myFilledOrders) : <Spinner type="table" />}
                </table>
                </Tab>
                <Tab eventKey="orders" title="Orders">
                <table className="table table-dark table-sm small">
                    <thead>
                    <tr>
                        <th>Amount</th>
                        <th>LEARN/ETH</th>
                        <th>Cancel</th>
                    </tr>
                    </thead>
                    {props.showMyOpenOrders ? showMyOpenOrders(props.myOpenOrders) : <Spinner type="table" />}
                </table>
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
  const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state);
  const orderCancelling = orderCancellingSelector(state);

    return {
      myFilledOrders: myFilledOrdersSelector(state),
      showMyFilledOrders: myFilledOrdersLoadedSelector(state),
      myOpenOrders: myOpenOrdersSelector(state),
      showMyOpenOrders: myOpenOrdersLoaded && !orderCancelling,
      exchange: exchangeSelector(state),
      account: accountSelector(state)
    }
  }
  
  export default connect(mapStateToProps) (MyTransactions);
  