import React from "react"
// @ts-ignore
import Plot from "react-plotly.js"

import percentileReport from "../../assets/data/percentile-report.json"

export default function PercentileGraph() {

    const data = [
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => 100),
            type: "scatter",
            mode: "lines",
            line: {
                color: "#4AA975",
                dash: "dash"
            },
            showlegend: false,
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => 200),
            type: "scatter",
            mode: "lines",
            line: {
                color: "#4AA975",
                dash: "dash"
            },
            name: "Target range"
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => row.p10),
            type: "scatter",
            mode: "lines",
            line: {
                color: "#E6E9F6"
            },
            showlegend: false,
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => row.p90),
            type: "scatter",
            mode: "lines",
            name: "10%/90% percentile",
            fill: "tonexty",
            line: {
                color: "#E6E9F6"
            }
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => row.p25),
            type: "scatter",
            mode: "lines",
            line: {
                color: "#C9CCD7"
            },
            showlegend: false,
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => row.p75),
            type: "scatter",
            mode: "lines",
            fill: "tonexty",
            line: {
                color: "#C9CCD7"
            },
            name: "25%/75% percentile"
        },
        {
            x: percentileReport.map(row => row.hour),
            y: percentileReport.map(row => row.p50),
            type: "scatter",
            mode: "lines",
            line: {
                color: "#73747B"
            },
            name: "Median value"
        },
    ]

    const layout = {
        height: 600,
        title: "Percentile Report",
    }

    const config = {
        responsive: true,
    }

    return <Plot data={data} layout={layout} config={config}/>
}