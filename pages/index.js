import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSession, signIn, signOut } from 'next-auth/react';

const socket = io();

export default function Home() {
  const [code, setCode] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const [typingUser, setTypingUser] = useState('');
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    socket.on('codeUpdate', (data) => {
      setCode(data);
    });

    socket.on('onlineUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('userTyping', (user) => {
      setTypingUser(user);
      setTimeout(() => setTypingUser(''), 3000);
    });

    return () => {
      socket.off('codeUpdate');
      socket.off('onlineUsers');
      socket.off('userTyping');
    };
  }, []);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    socket.emit('codeChange', newCode);
    socket.emit('typing', session.user.name);
  };

  useEffect(() => {
    if (session) {
      socket.emit('join', session.user);
    }
  }, [session]);

  if (loading) return <p>Loading...</p>;

  if (!session) {
    return (
      <div>
        <h1>Collaborative Code Pad - Lumnda</h1>
        <p>Please sign in to start editing</p>
        <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '20%', padding: '10px', borderRight: '1px solid #ccc' }}>
        <h2>Online Users</h2>
        <ul>
          {Object.values(onlineUsers).map((user) => (
            <li key={user.email}>
              <img src={user.image} alt={user.name} style={{ width: '30px', borderRadius: '50%' }} />
              {user.name}
            </li>
          ))}
        </ul>
        <h2>Offline Users</h2>
      </div>
      <div style={{ width: '80%', padding: '10px' }}>
        <h1>Collaborative Code Pad - Lumnda</h1>
        <button onClick={() => signOut()}>Sign out</button>
        <textarea
          value={code}
          onChange={handleCodeChange}
          rows={20}
          cols={100}
          style={{ fontFamily: 'monospace', fontSize: '16px', width: '100%', height: '80vh' }}
        />
        {typingUser && <p>{typingUser} is typing... Please wait.</p>}
      </div>
    </div>
  );
}
