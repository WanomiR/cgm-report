import pandas as pd


def filter_entries_by_date(entries_json, date: str, subset=("_id", "sgv", "noise")):
    tmp = pd.DataFrame(entries_json)
    tmp["dateString"] = pd.to_datetime(tmp["dateString"], format="%Y-%m-%dT%H:%M:%S.%fZ")
    tmp.set_index("dateString", inplace=True)
    tmp = tmp[tmp["type"] == "sgv"]
    tmp = tmp.loc[date, subset]
    tmp.reset_index(inplace=True)
    return tmp.to_dict(orient="records")