import React from 'react'

import { ChartComponent } from './ChartComponent.js'

export default class DoughnutChartComponent extends ChartComponent {
    componentDidMount() {
        const data = {
            labels: Object.keys(this.props.data),
            datasets: [
                {
                    data: Object.values(this.props.data)
                }
            ]
        }

        const options = {
            legend: {
                position: 'left'
            },
            responsive: false
        }

        this.create_chart('doughnut', data, options)
    }

    render(props, state) {
        return (
            <div className="chart-container">
                <canvas ref={this.ref}></canvas>
            </div>
        )
    }
}
