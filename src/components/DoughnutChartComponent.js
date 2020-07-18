import { ChartComponent } from './ChartComponent.js'

export default class DoughnutChartComponent extends ChartComponent {
    componentDidMount() {
        const data = {
            labels: ['Time spent'],
            datasets: Object.entries(this.props.data).map(
                ([key, value]) => ({ label: key, data: [value] })
            )
        }

        const options = {
            legend: {
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    display: false,
                    ticks: {
                        min: 0,
                        max: 1
                    }
                }],
                yAxes: [{
                    stacked: true,
                    display: false
                }]
            }
        }

        this.create_chart('horizontalBar', data, options)
    }
}
