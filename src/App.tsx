import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const getUser = async () => {
    axios.get<User[]>('/user').then(res => setUsers(res.data));
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="App">
      <h1>Users</h1>
      {users.map(user => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  );
}

export default App;
