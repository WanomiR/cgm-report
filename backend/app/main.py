from typing import Annotated

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from crud import fetch_entries
from scripts.entries import filter_entries_by_date
from schemas import Entry

app = FastAPI()


origins = ["http://localhost:3000"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/entries/", response_model=list[Entry])
async def get_entries_by_date(date: Annotated[str, Query()]):
    return filter_entries_by_date(fetch_entries(), date)
