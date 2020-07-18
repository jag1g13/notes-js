import React from 'react'
import moment from 'moment'

import { ChartComponent } from './ChartComponent.js'

export default class ProjectChartComponent extends ChartComponent {
    componentDidMount() {
        const options = {
            scales: {
                xAxes: [{
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'day'
                    },
                    ticks: {
                        max: moment().toDate(),
                        min: moment().subtract(14, 'd').toDate()
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 1,
                        stepSize: 0.25,
                        callback: (value, index, values) => value.toFixed(2),
                        padding: 5
                    },
                    gridLines: {
                        drawBorder: false
                    }
                }]
            }
        }

        this.create_chart('bar', {}, options)
    }

    render() {
        if (this.state) {
            const chart = this.state.chart
            chart.data = this.props.data
            chart.update()
        }

        return (
            <div className="chart-container">
                <canvas ref={this.ref}></canvas>
            </div>
        )
    }
}
