import datetime
from pydantic import BaseModel


class Entry(BaseModel):
    id: int
    ts: datetime.datetime
    sgv: int
    noise: int | None = None

    class Config:
        from_attributes = True
