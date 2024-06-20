import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');
  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      // Handle file upload logic here
    }
  }, [file]);

  useEffect(() => {
    setUsername(currentUser?.username || '');
    setEmail(currentUser?.email || '');
    setAvatar(currentUser?.avatar || '');
  }, [currentUser]);

  const handleSignOut = () => {
    // Logic for signing out
    navigate('/signin');
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/users/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate('/signin');
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const formData = { username, email, password, avatar };
      const res = await fetch(`/api/users/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      dispatch(signUpStart());
      const formData = { username, email, password, avatar };
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(signUpFailure(data.message));
        return;
      }
      dispatch(signUpSuccess(data));
      navigate('/profile');
    } catch (error) {
      dispatch(signUpFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!data.success) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data.listings);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listings/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!data.success) {
        return;
      }
      setUserListings((prevListings) => prevListings.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>
          Delete account
        </span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>
          Sign out
        </span>
      </div>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button>
      {showListingsError && <p className='text-red-700 mt-5'>Error showing listings</p>}
      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
              </Link>
              <Link className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
                <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase'>
                  Delete
                </button>
                <button className='text-green-700 uppercase'>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
