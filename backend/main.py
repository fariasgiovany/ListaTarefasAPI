from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import  Annotated
import models
from models import Listas
from database import engine, SessionLocal
from sqlalchemy.orm import Session



app = FastAPI()
models.Base.metadata.create_all(bind=engine)


class Lista(BaseModel):
    
    lista: str
    status: int
    


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/lista/")
async def create_lista(lista: Lista, db: Session = Depends(get_db)):
    
    
    db_lista = models.Listas(tarefa=lista.lista, status=lista.status)
    db.add(db_lista)
    
    db.commit()
    db.refresh(db_lista)
    

    return {"cadastro": "cadastrado"}


@app.get("/lista/")
async def get_lista(db: Session = Depends(get_db)):
    lista = db.query(models.Listas).all()
    print (lista)
    return lista    


@app.get("/lista/{lista_id}")
async def get_lista(lista_id: int, db: Session = Depends(get_db)):
    lista = db.query(models.Listas).filter(models.Listas.id == lista_id).first()
    if lista is None:
        raise HTTPException(status_code=404, detail="Lista não encontrada")
    return lista

@app.get("/listafazer/")
async def get_lista(db: Session = Depends(get_db)):
    lista = db.query(models.Listas).filter(models.Listas.status == 0).all()
    if lista is None:
        raise HTTPException(status_code=404, detail="Lista não encontrada")
    return lista

@app.get("/listafazendo/")
async def get_lista(db: Session = Depends(get_db)):
    lista = db.query(models.Listas).filter(models.Listas.status == 1).all()
    if lista is None:
        raise HTTPException(status_code=404, detail="Lista não encontrada")
    return lista

@app.get("/listafeito/")
async def get_lista(db: Session = Depends(get_db)):
    lista = db.query(models.Listas).filter(models.Listas.status == 2).all()
    if lista is None:
        raise HTTPException(status_code=404, detail="Lista não encontrada")
    return lista

@app.put("/lista/{lista_id}")
async def update_lista(lista_id: int, lista: Lista, db: Session = Depends(get_db)):
    db_lista = db.query(models.Listas).filter(models.Listas.id == lista_id).first()
    if db_lista is None:
        raise HTTPException(status_code=404, detail="Lista não encontrada")
    db_lista.tarefa = lista.lista
    db_lista.status = lista.status
    db.commit()
    db.refresh(db_lista)
    return db_lista

