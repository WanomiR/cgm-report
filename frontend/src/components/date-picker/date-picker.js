// @ts-nocheck
import React from "react";

export default function DatePicker({dateInfo, setDateInfo}) {

    const handleDateChange = (e) => {
        setDateInfo({...dateInfo, date: e.target.value})
    }

    return (
        <form>
            <label htmlFor={"date"}>Select date</label><br/>
            <input
                type={"date"} id={"date"} value={dateInfo.date}
                min={dateInfo.dateMin} max={dateInfo.dateMax}
                onChange={handleDateChange}
            ></input>
        </form>
    )

}
