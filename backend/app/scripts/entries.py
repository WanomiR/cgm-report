import pandas as pd


def from_json(data_json):
    df = pd.DataFrame(data_json)
    df["dateString"] = pd.to_datetime(df["dateString"], format="%Y-%m-%dT%H:%M:%S.%fZ")
    df.set_index("dateString", inplace=True)
    return df


def filter_entries_by_date(entries_json, date: str, subset=("_id", "sgv", "noise")):
    tmp = from_json(entries_json)
    tmp = tmp[tmp["type"] == "sgv"]
    tmp = tmp.loc[date, subset]
    tmp.reset_index(inplace=True)
    return tmp.to_dict(orient="records")


def dates_range(entries_json):
    tmp = from_json(entries_json)
    date_min = tmp.index.min().date()
    date_max = tmp.index.max().date()
    result = {"dateMin": date_min, "dateMax": date_max}
    return result
