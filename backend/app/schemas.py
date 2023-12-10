import datetime
from pydantic import BaseModel


class Entry(BaseModel):
    id: int
    ts: datetime.datetime
    sgv: int
    noise: int | None = None

    class Config:
        from_attributes = True


class PercentileReport(BaseModel):
    hour: int
    p10: int
    p25: int
    p50: int
    p75: int
    p90: int

