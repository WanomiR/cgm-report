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


def get_percentile_report(db: Session, date_from: str, date_to: str):
    stmt = text(f"""
        SELECT
            hour,
            MAX(CASE ptile WHEN 10 THEN sgv END) AS p10,
            MAX(CASE ptile WHEN 25 THEN sgv END) AS p25,
            MAX(CASE ptile WHEN 50 THEN sgv END) AS p50,
            MAX(CASE ptile WHEN 75 THEN sgv END) AS p75,
            MAX(CASE ptile WHEN 90 THEN sgv END) AS p90
        FROM
            (SELECT
                hour,
                sgv,
                NTILE(100) OVER (PARTITION BY hour ORDER BY sgv ASC) ptile
            FROM
                (SELECT
                    EXTRACT('hour' FROM ts) AS hour,
                    sgv
                FROM entries 
                WHERE ts::date >= '{date_from}' AND ts::date <= '{date_to}'))
        WHERE 
            ptile IN (10, 25, 50, 75, 90)
        GROUP BY hour
    """)
    return db.execute(stmt).mappings().all()


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
    entry = db.query(models.Entry).filter(models.Entry.id == entry_id).first()
    if entry is None:
        return 0
    else:
        db.delete(entry)
        db.commit()
        return 1
