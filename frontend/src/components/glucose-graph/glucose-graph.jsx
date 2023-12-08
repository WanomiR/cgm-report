// @ts-nocheck
import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js"
import {fetchEntries, fetchDatesRange} from "../api/api";
import DatePicker from "../date-picker/date-picker";


export default function GlucoseGraph() {

    const [data, setData] = useState(null)

    const [dateInfo, setDateInfo] = useState({
        date: "2022-12-17",
        dateMin: "2022-12-12",
        dateMax: "2023-03-05"
    })

    useEffect(() => {
        loadEntries()
    }, [dateInfo]);


    const loadEntries = async () => {

        const entries = await fetchEntries(dateInfo.date)

        setData([{
            x: entries.map(row => new Date(row.ts)),
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
        }])
    }

    const selectorOptions = {
        buttons: [{
            step: "day",
            stepmode: "backward",
            count: 1,
            label: "24h"
        }, {
            step: "hour",
            stepmode: "backward",
            count: 12,
            label: "12h"
        }, {
            step: "hour",
            stepmode: "backward",
            count: 6,
            label: "6h"
        }, {
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

    return (
        <>
            <DatePicker dateInfo={dateInfo} setDateInfo={setDateInfo}/>
            {
                data &&
                <Plot data={data} layout={layout} config={config}/>
            }
        </>
    )
}

