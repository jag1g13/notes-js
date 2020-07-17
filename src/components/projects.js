import React from 'react'

import { Chart } from 'chart.js'
// import 'https://unpkg.com/chartjs-plugin-colorschemes'

class ChartComponent extends React.Component {
    ref = React.createRef()

    create_chart(type, data, options) {
        if (this.ref.current) {
            const chart = new Chart(this.ref.current, {
                type: type,
                data: data,
                options: options
            })

            this.setState({ chart: chart })
        }
    }
}

class ProjectChartComponent extends ChartComponent {
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
            position: 'relative',
            height: '20vh'
        }

        return (
            <div className="chart-container" style={style}>
                <canvas ref={this.ref} width="400px" height="400px"></canvas>
            </div>
        )
    }
}

class DoughnutChartComponent extends ChartComponent {
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
            position: 'relative',
            height: '10vh'
        }

        return (
            <div className="chart-container" style={style}>
                <canvas ref={this.ref} width="400px" height="400px"></canvas>
            </div>
        )
    }
}

export { ProjectChartComponent, DoughnutChartComponent }
