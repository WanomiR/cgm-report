from sqlalchemy.orm import Session
from sqlalchemy import text

import models, schemas


def get_all_entries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entry).offset(skip).limit(limit).all()


def get_entries_by_date(db: Session, date_from: str, date_to: str):
    stmt = text(f"""
        SELECT * 
        FROM entries 
        WHERE ts::date >= '{date_from}' AND ts::date <= '{date_to}'
    """)
    return db.execute(stmt).mappings().all()


def get_entries_dates_range(db: Session):
    stmt = text("SELECT max(ts::date),  min(ts::date) FROM entries")
    return db.execute(stmt).mappings().first()


def create_entry(db: Session, entry: schemas.Entry):
    db_entry = models.Entry(
        id=entry.id,
        ts=entry.ts,
        sgv=entry.sgv,
        noise=entry.noise
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry


def delete_entry(db: Session, entry_id: int) -> int:
    # stmt = text(f"SELECT * FROM entries WHERE id = {entry_id}")
    entry = db.query(models.Entry).filter(models.Entry.id == entry_id).first()
    if entry is None:
        return 0
    else:
        db.delete(entry)
        db.commit()
        return 1
