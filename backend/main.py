from fastapi import FastAPI
from pydantic import BaseModel
from typing import Union
import uvicorn
import mysql.connector

db_config = {
    "host": "127.0.0.1",
    "user": "yah",
    "password": "yahtzee@123",
    "database": "yahtzee",
}

db = mysql.connector.connect(**db_config)
"""
class User(BaseModel):
    username:str
    


app = FastAPI()



@get("/leaderboard")
def get_leaderboard():
    
    return data
"""