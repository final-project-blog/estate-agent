import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Profile({ currentUser, setCurrentUser }) {
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignOut = () => {
    setCurrentUser(null);
    // Hier können Sie auch zusätzliche Abmelde-Logik hinzufügen, z.B. Entfernen von Tokens
    navigate('/sign-in');
  };

  const handleDeleteAccount = () => {
    // Hier können Sie die Löschlogik für das Benutzerkonto hinzufügen
    setCurrentUser(null);
    navigate('/sign-in');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Hier können Sie die Aktualisierungslogik für das Benutzerprofil hinzufügen
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
        <img src={currentUser?.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input
          type="text"
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type='submit'
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign out</span>
      </div>
    </div>
  );
}

