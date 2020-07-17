import React from 'react'
import 'chartjs-plugin-colorschemes'

import { Chart } from 'chart.js'

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


export { ChartComponent }
