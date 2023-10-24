from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union, List
from utilities.logic import randomNums
import uvicorn
import mysql.connector


db_config = {
    "host": "127.0.0.1",
    "user": "yah",
    "password": "yahtzee@123",
    "database": "yahtzee",
}



class User(BaseModel):
    username:str
    score:int

class AllUser(User):
    
    gen_rank: int
    
    

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["*"],
)


@app.get("/leaderboard", response_model=List[AllUser])
def get_leaderboard():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Insert data into the MySQL table
        insert_query = "Select * from user_info order by score desc;"
        cursor.execute(insert_query)
        allUser = cursor.fetchall()
        
        conn.commit()
        conn.close()
        
        i = 1
        for user in allUser:
            user["gen_rank"] = i
            user.pop("id")
            i += 1
        data = [AllUser(**user) for user in allUser]
        
        return data

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    

@app.post("/saveUser")
def saveNewUser(user:User):
    query = "INSERT INTO user_info (username, score) VALUES (%s, %s);"
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # Insert data into the MySQL table
        insert_query = "INSERT INTO datatable (name, email) VALUES (%s, %s)"
        cursor.execute(query, (user.username, user.score) )
        conn.commit()

        conn.close()
        return 

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
@app.get("/pick")
def picks():
    pass

@app.get("/rolls")
def rollsDice(n:Union[None, int] = None):
    
    if n:
        return randomNums(n)
    return randomNums()
    
