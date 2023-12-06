from typing import Annotated

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from crud import fetch_entries
from scripts.entries import filter_entries_by_date, dates_range
from schemas import Entry, EntriesRange

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
async def get_entries_by_date(date: Annotated[str, Query(pattern=r"^[\d]{4}-[\d]{2}-[\d]{2}$")]):
    entries = await fetch_entries()
    return filter_entries_by_date(entries, date)


@app.get("/entries/range/", response_model=EntriesRange)
async def get_entries_dates_range():
    entries = await fetch_entries()
    return dates_range(entries)