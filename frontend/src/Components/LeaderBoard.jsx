import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/leaderboard';

    axios.get(apiUrl).then((response) => {
      const users = response.data;
      setUsers(users);
    });
  }, []);
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.gen_rank}   {user.username}  {user.score}</li>
      ))}
    </ul>
  );
};

export default LeaderBoard;