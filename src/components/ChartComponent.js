import React from 'react'
import 'chartjs-plugin-colorschemes'

import { Chart } from 'chart.js'

export default class ChartComponent extends React.Component {
    chartRef = React.createRef()

    createChart (type, data, options) {
      if (this.chartRef.current) {
        const chart = new Chart(this.chartRef.current, {
          type: type,
          data: data,
          options: options
        })

        this.setState({ chart: chart })
      }
    }

    render () {
      return (
        <div className='chart-container'>
          <canvas ref={this.chartRef} />
        </div>
      )
    }
}
