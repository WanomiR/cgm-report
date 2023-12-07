from sqlalchemy import Column, Integer, DateTime, Numeric

from database import Base


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    ts = Column(DateTime)
    sgv = Column(Integer)
    noise = Column(Numeric)