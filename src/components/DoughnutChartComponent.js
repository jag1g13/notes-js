import React from 'react'

import { ChartComponent } from './ChartComponent.js'

export default class DoughnutChartComponent extends ChartComponent {
    componentDidMount() {
        const data = {
            labels: ['1', '2'],
            datasets: [
                {
                    label: '1',
                    data: [1, 2],
                }
            ]
        }

        this.create_chart('doughnut', data, {})
    }

    render(props, state) {
        const style = {
            // position: 'relative',
            // height: '1vh'
        }

        return (
            <div className="chart-container" style={style}>
                <canvas ref={this.ref}></canvas>
            </div>
        )
    }
}
