import datetime
from pydantic import BaseModel


class Entry(BaseModel):
    id: int
    ts: datetime.datetime
    sgv: int
    noise: int

    class Config:
        orm_mode = True
