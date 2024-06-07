import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/user'); // 서버 URL 확인
        const data: User[] = await response.json();

        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
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
