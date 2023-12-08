// @ts-nocheck
import React, {useEffect, useState} from "react";
import Plot from "react-plotly.js"
import {fetchEntries, fetchDatesRange} from "../api/api";
import DatePicker from "../date-picker/date-picker";


export default function GlucoseGraph() {

    const [dataSate, setDataState] = useState({
        isLoading: false,
        hasError: false,
        data: []
    })

    const [dateInfo, setDateInfo] = useState({
        date: "",
        dateMin: "",
        dateMax: ""
        // date: "2022-12-17",
        // dateMin: "2022-12-12",
        // dateMax: "2023-10-19"
    })

    useEffect(() => {
        loadEntries()
    }, [dateInfo]);

    useEffect(() => {
        (async () => {
            const {max, min} = await fetchDatesRange()
            setDateInfo({
                ...dateInfo,
                date: min,
                dateMin: min,
                dateMax: max,
            })

            loadEntries();
        })();
    }, []);


    const loadEntries = async () => {

        setDataState({...dataSate, isLoading: true, hasError: false});
        try {
            const entries = await fetchEntries(dateInfo.date)
            setDataState({
                ...dataSate, isLoading: false, data: [{
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
                }]
            })
        } catch (error) {
            setDataState({...dataSate, isLoading: false, hasError: true});
            console.log(error);
        }
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

    const {data, isLoading, hasError} = dataSate;

    return (
        <>
            <DatePicker dateInfo={dateInfo} setDateInfo={setDateInfo}/>
            {isLoading && "Data is loading..."}
            {hasError && "Data loading error!"}
            {
                !isLoading && !hasError && data.length &&
                <Plot data={data} layout={layout} config={config}/>
            }
        </>
    )
}

