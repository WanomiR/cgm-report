import React from "react";
// @ts-ignore
import Plot from "react-plotly.js"

import entries from "../../assets/data/one-day-entries.json"

export default function GlucoseGraph() {

    const data = [{
        x: entries.map(row => new Date(row.dateString)),
        y: entries.map(row => row.sgv),
        type: "scatter",
        mode: "markers",
        marker: {
            color: entries.map(row => row.sgv),
            colorscale: [
                [0, "red"],
                [.5, "green"],
                [1, "red"],
            ],
            cmin: 100,
            cmax: 250
        }
    }]

    const selectorOptions = {
        buttons: [{
            step: "day",
            stepmode: "backward",
            count: 1,
            label: "24h"
        },{
            step: "hour",
            stepmode: "backward",
            count: 12,
            label: "12h"
        },{
            step: "hour",
            stepmode: "backward",
            count: 6,
            label: "6h"
        },{
            step: "hour",
            stepmode: "backward",
            count: 3,
            label: "3h"
        }]
    }

    const layout = {
        height: 600,
        title: "Blood glucose graph",
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
    }

    const config = {
        responsive: true,
    }

    return <Plot data={data} layout={layout} config={config}/>
}

