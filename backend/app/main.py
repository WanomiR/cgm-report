from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from sqlalchemy.orm import Session

import crud, models, schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/entries/", response_model=list[schemas.Entry])
def get_entries_by_date(date: Annotated[str, Query()], db: Session = Depends(get_db)):
    return crud.get_entries_by_date(db, date)



@app.post("/entries/", response_model=schemas.Entry)
def create_entry(entry: schemas.Entry, db: Session = Depends(get_db)):
    return crud.create_entry(db, entry)


@app.delete("/entries/")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    return crud.delete_entry(db, entry_id)