import React from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'
import Spinner from './Spinner'
import { chartOptions } from './PriceChart.config'
import {
    priceChartLoadedSelector,
    priceChartSelector
  } from '../store/selectors'


const PriceChart = (props) => {
 
    const priceSymbol = (lastPriceChange) => {
        let output;
        if (lastPriceChange === '+') {
            output = <span className='text-success'>&#9650;</span> //entity number for up triange 
        } else {
            output = <span className='text-danger'>&#9660; </span> //entity number for down triangle
        }
        return output
    }
    
    const showPriceChart = (priceChart) => {
        return (
            <div className='price-chart text-white'>
                <div className='price '>
                    <h4>LEARN/ETH &nbsp; {priceSymbol(priceChart.lastPriceChange)} &nbsp; {priceChart.lastPrice}</h4>
                </div>
                <Chart options={chartOptions} series={priceChart.series} type="candlestick" width='100%' height='100%'/>
            </div>
        )
    }


    
    return (
        <div className="card bg-dark text-white">
            <div className='card-header'>
                Price Chart
            </div>
            <div className='card-body'>
                {props.priceChartLoaded ? showPriceChart(props.priceChart) : <Spinner />}
               
            </div>
            
        </div>
    )
}


function mapStateToProps(state) {

    return {
      priceChartLoaded: priceChartLoadedSelector(state),
      priceChart: priceChartSelector(state),
    }
  }
  
  export default connect(mapStateToProps)(PriceChart)
  
