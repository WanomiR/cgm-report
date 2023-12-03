import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import {Chart} from "react-chartjs-2"

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Legend,
    Tooltip,
    Title
)

export default function Graph() {

    const dataset = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];

    const data = {
        labels: dataset.map(row => row.year),
        datasets: [
            {
                label: "Acquisition year",
                data: dataset.map(row => row.count),
                backgroundColor: "#9bd0f5",
                borderColor: "#36a2eb"
            }
        ]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                font: {
                    "size": "32"
                }
            }
        }
    }

    return <Chart type={"bar"} data={data} options={options}/>
}

