import React from 'react'
import 'chartjs-plugin-colorschemes'

import { Chart } from 'chart.js'

export default class ChartComponent extends React.Component {
    chart_ref = React.createRef()

    create_chart(type, data, options) {
        if (this.chart_ref.current) {
            const chart = new Chart(this.chart_ref.current, {
                type: type,
                data: data,
                options: options
            })

            this.setState({ chart: chart })
        }
    }

    render() {
        return (
            <div className="chart-container">
                <canvas ref={this.chart_ref}></canvas>
            </div>
        )
    }
}
