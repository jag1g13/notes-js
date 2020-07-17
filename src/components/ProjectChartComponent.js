import React from 'react'

import { ChartComponent } from './ChartComponent.js'

export default class ProjectChartComponent extends ChartComponent {
    componentDidMount() {
        const data = {
            labels: ['1', '2'],
            datasets: [
                {
                    label: '1',
                    data: [1, 2],
                },
                {
                    label: '2',
                    data: [1, 2],
                }
            ]
        }

        const options = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

        this.create_chart('bar', data, options)
    }

    render(props, state) {
        const style = {
            // position: 'relative',
            // height: '20vh'
        }

        return (
            <div className="chart-container" style={style}>
                <canvas ref={this.ref}></canvas>
            </div>
        )
    }
}
