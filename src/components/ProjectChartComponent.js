import moment from 'moment'

import ChartComponent from './ChartComponent.js'

/**
 * Stacked bar chart displaying time spent on projects each day.
 */
export default class ProjectChartComponent extends ChartComponent {
    /**
     * When column is clicked, select this note in the parent component.
     */
    handle_click(evt) {
        const element = this.state.chart.getElementAtEvent(evt)[0]

        if (element !== undefined) {
            this.props.select_note(element._index)
        }
    }

    /**
     * Configure chart element before data is loaded.
     */
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
                        startAtZero: true,
                        stepSize: 0.25,
                        callback: value => value.toFixed(2),
                        padding: 5
                    },
                    gridLines: {
                        drawBorder: false
                    }
                }]
            },
            onClick: this.handle_click.bind(this)
        }

        this.create_chart('bar', {}, options)
    }

    render() {
        if (this.state) {
            // Load data passed in through props
            const chart = this.state.chart
            chart.data = this.props.data
            chart.update()
        }

        return super.render()
    }
}