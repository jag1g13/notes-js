import * as Preact from 'https://unpkg.com/htm/preact/standalone.module.js'
import 'https://unpkg.com/chart.js/dist/Chart.bundle.js'
import 'https://unpkg.com/chartjs-plugin-colorschemes'

class ChartComponent extends Preact.Component {
    create_chart(type, data, options) {
        const ctx = document.getElementById(this.props.chart_id)

        const chart = new Chart(ctx, {
            type: type,
            data: data,
            options: options
        })

        this.setState({
            chart_element: ctx,
            chart: chart
        })
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
        return Preact.html`
            <div class="chart-container" style="position: relative; height: 20vh">
                <canvas id="${props.chart_id}" width="400px" height="400px"></canvas>
            </div>
        `
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
        return Preact.html`
            <div class="chart-container" style="position: relative; height: 10vh">
                <canvas id="${props.chart_id}" width="400px" height="400px"></canvas>
            </div>
        `
    }
}

export { ProjectChartComponent, DoughnutChartComponent }
