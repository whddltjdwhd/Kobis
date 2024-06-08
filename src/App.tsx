import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
}

interface Course {
  cno: string;
  cname: string;
  credit: number;
  enter_date: string;
  prname: string;
  update_date: null | string;
}

interface Movie {
  id: number; // id is optional because it is auto-incremented
  title: string;
  engTitle?: string;
  year: number;
  country: string;
  mType: string;
  genre: string;
  status?: string;
  director: string;
  company?: string;
  enterDate?: Date; // enterDate is optional because it defaults to the current datetime
}

function App() {
  const [users, setUsers] = useState<Movie[]>([]);

  const getUser = async () => {
    axios.get<Movie[]>('/movies').then(res => {
      console.log(res);
      setUsers(res.data);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <h1>Movies</h1>
      {users.map(user => (
        <div key={user.id}>{user.title}</div>
      ))}
    </div>
  );
}

export default App;
