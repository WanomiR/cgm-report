from pandas import Timestamp
from typing import Annotated
from pydantic import BaseModel, PlainValidator, WithJsonSchema


_Timestamp = Annotated[
    Timestamp,
    PlainValidator(lambda x: Timestamp(x)),
    WithJsonSchema({"type": 'date-time'})
]


class Entry(BaseModel):
    _id: str
    dateString: _Timestamp
    sgv: float
    noise: float
