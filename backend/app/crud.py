from sqlalchemy.orm import Session

import models, schemas


def get_entries(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entry).offset(skip).limit(limit).all()


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


