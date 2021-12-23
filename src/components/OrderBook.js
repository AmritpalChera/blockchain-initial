import React from 'react'
import Spinner from './Spinner'
import { connect, useDispatch } from 'react-redux'
import { orderBookSelector, orderBookLoadedSelector, accountSelector, exchangeSelector, orderFillingSelector } from '../store/selectors';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { fillOrder } from '../store/interactions';

const OrderBook = (props) => {
  const dispatch = useDispatch();
    const renderOrder = (order) => {
      return (
        <OverlayTrigger
          key={order.id}
          placement='auto'
          overlay={
            <Tooltip id={order.id}>
              {`Click here to ${order.orderFillAction}`}
            </Tooltip>
          }
        >

          <tr key={order.id} className='order-book-order'
            onClick={(e)=> fillOrder(dispatch, props.exchange, order, props.account)}
          >
            <td>{order.tokenAmount}</td>
            <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
            <td>{order.etherAmount}</td>
          </tr> 
        </OverlayTrigger>
         
        )
      }
      
      const showOrderBook = ({orderBook}) => {
     
      
        return(
          <tbody>
            {orderBook.sellOrders.map((order) => renderOrder(order))}
            <tr>
              <th>LEARN</th>
              <th>LEARN/ETH</th>
              <th>ETH</th>
            </tr>
            {orderBook.buyOrders.map((order) => renderOrder(order))}
          </tbody>
        )
      }

    return (
        <div className="vertical">
        <div className="card bg-dark text-white">
          <div className="card-header">
            Order Book
          </div>
          <div className="card-body order-book">
            <table className="table table-dark table-sm small">
              {  props.showOrderBook ? showOrderBook(props) : <Spinner type='table' /> }
            </table>
          </div>
        </div>
      </div>
    )
}
function mapStateToProps(state) {
  const orderBookLoaded = orderBookLoadedSelector(state);
  const orderFilling = orderFillingSelector(state)
    return {
      orderBook: orderBookSelector(state),
      showOrderBook: orderBookLoaded && !orderFilling,
      exchange: exchangeSelector(state),
      account: accountSelector(state)
    }
  }
  
  export default connect(mapStateToProps)(OrderBook);
  