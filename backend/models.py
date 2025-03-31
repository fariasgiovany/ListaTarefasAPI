from sqlalchemy import Column, Integer, String, ForeignKey
from pydantic   import BaseModel   
from  database import Base



class Listas(Base):
    __tablename__ = 'lista'
    id = Column(Integer, primary_key=True, index=True)
    tarefa = Column(String)
    status= Column(Integer)