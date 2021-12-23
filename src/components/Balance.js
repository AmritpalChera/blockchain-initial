import React, { useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap';
import { connect, useDispatch } from 'react-redux';
import {
    loadBalances,
    depositEther,
    depositToken,
    withdrawEther,
    withdrawToken
  } from '../store/interactions'
import {
    exchangeSelector,
    tokenSelector,
    accountSelector,
    web3Selector,
    etherBalanceSelector,
    tokenBalanceSelector,
    exchangeEtherBalanceSelector,
    exchangeTokenBalanceSelector,
    balancesLoadingSelector,
    etherDepositAmountSelector,
    etherWithdrawAmountSelector,
    tokenDepositAmountSelector,
    tokenWithdrawAmountSelector,
} from '../store/selectors';
import {
    etherDepositAmountChanged,
    etherWithdrawAmountChanged,
    tokenDepositAmountChanged,
    tokenWithdrawAmountChanged,
  } from '../store/actions'
import Spinner from './Spinner';

const Balance = (props) => {
    const dispatch = useDispatch();
    const { web3, exchange, token, account } = props
    const loadBlockchainData = async () => {
        await loadBalances(dispatch, web3, exchange, token, account)
    }

    useEffect(() => {
        loadBlockchainData(); 
    }, [props.balancesLoading])

    const etherBalanceTable = () => {
        return (
            <table className="table table-dark table-sm small">
                <thead>
                    <tr>
                    <th>Token</th>
                    <th>Wallet</th>
                    <th>Exchange</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>ETH</td>
                    <td>{props.etherBalance}</td>
                    <td>{props.exchangeEtherBalance}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const tokenBalanceTable = () => {
        return (
            <table className="table table-dark table-sm small">
                <tbody>
                    <tr>
                    <td>LEARN</td>
                    <td>{props.tokenBalance}</td>
                    <td>{props.exchangeTokenBalance}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    const depositEtherForm = () => {
        return (
            <form className="row" onSubmit={(event) => {
                event.preventDefault()
                depositEther(dispatch, exchange, web3, props.etherDepositAmount, account)
            }}>
                <div className="col-12 col-sm pr-sm-2">
                <input
                type="text"
                placeholder="ETH Amount"
                onChange={(e) => dispatch( etherDepositAmountChanged(e.target.value) ) }
                className="form-control form-control-sm bg-dark text-white"
                required />
                </div>
                <div className="col-12 col-sm-auto pl-sm-0">
                <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
                </div>
            </form>
        )
    }

    const depositTokenForm = () => {
        return (
            <form className="row" onSubmit={(event) => {
                event.preventDefault()
                depositToken(dispatch, exchange, web3, token, props.tokenDepositAmount, account)
            }}>
                <div className="col-12 col-sm pr-sm-2">
                <input
                type="text"
                placeholder="LEARN Amount"
                onChange={(e) => dispatch( tokenDepositAmountChanged(e.target.value) )}
                className="form-control form-control-sm bg-dark text-white"
                required />
                </div>
                <div className="col-12 col-sm-auto pl-sm-0">
                <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
                </div>
            </form>
        )
    }

    const withdrawEtherForm = () => {
        return (
            <form className="row" onSubmit={(event) => {
                event.preventDefault()
                withdrawEther(dispatch, exchange, web3, props.etherWithdrawAmount, account)
              }}>
                <div className="col-12 col-sm pr-sm-2">
                  <input
                  type="text"
                  placeholder="ETH Amount"
                  onChange={(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
                  className="form-control form-control-sm bg-dark text-white"
                  required />
                </div>
                <div className="col-12 col-sm-auto pl-sm-0">
                  <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
                </div>
              </form>
        )
    }

    const withdrawTokenForm = () => {
        return (
            <form className="row" onSubmit={(event) => {
                event.preventDefault()
                withdrawToken(dispatch, exchange, web3, token, props.tokenWithdrawAmount, account)
              }}>
                <div className="col-12 col-sm pr-sm-2">
                  <input
                  type="text"
                  placeholder="LEARN Amount"
                  onChange={(e) => dispatch( tokenWithdrawAmountChanged(e.target.value) )}
                  className="form-control form-control-sm bg-dark text-white"
                  required />
                </div>
                <div className="col-12 col-sm-auto pl-sm-0">
                  <button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
                </div>
            </form>
        )
    }

    const showForm = () => {
        return (
            <Tabs defaultActiveKey="deposit" className="bg-dark text-white">
                <Tab eventKey="deposit" title="Deposit" className="bg-dark">
                    {etherBalanceTable()}
                    {depositEtherForm()}
                    {tokenBalanceTable()}
                    {depositTokenForm()}
                   

                    
                </Tab>

                <Tab eventKey="withdraw" title="Withdraw" className="bg-dark">
                    {etherBalanceTable()}
                    {withdrawEtherForm()}
                    {tokenBalanceTable()}
                    {withdrawTokenForm()}
                </Tab>
            </Tabs>
        )
    }

    return (
        <div className='card bg-dark text-white'>
            <div className='card-header'>
                Balance
            </div>
            <div className='card-body'>
                {props.showForm ? showForm(props) : <Spinner />}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const balancesLoading = balancesLoadingSelector(state)

    console.log({
        account: accountSelector(state),
        exchange: exchangeSelector(state),
        token: tokenSelector(state),
        web3: web3Selector(state),
        etherBalance: etherBalanceSelector(state),
        tokenBalance: tokenBalanceSelector(state),
        exchangeEtherBalance: exchangeEtherBalanceSelector(state),
        exchangeTokenBalance: exchangeTokenBalanceSelector(state),
        balancesLoading,
        showForm: !balancesLoading
    })


    return {
        account: accountSelector(state),
        exchange: exchangeSelector(state),
        token: tokenSelector(state),
        web3: web3Selector(state),
        etherBalance: etherBalanceSelector(state),
        tokenBalance: tokenBalanceSelector(state),
        exchangeEtherBalance: exchangeEtherBalanceSelector(state),
        exchangeTokenBalance: exchangeTokenBalanceSelector(state),
        balancesLoading,
        showForm: !balancesLoading,
        etherDepositAmount: etherDepositAmountSelector(state),
        etherWithdrawAmount: etherWithdrawAmountSelector(state),
        tokenDepositAmount: tokenDepositAmountSelector(state),
        tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
    }
}

export default connect(mapStateToProps)(Balance)
