import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from '../redux/user/userSlice';
import { getListingsWithImages } from '../utils/images.util';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(undefined);
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const listingsRes = await fetch(`http://3.121.231.45:3000/api/user/listings/${currentUser._id}`);
      const userListings = await listingsRes.json();
      if (userListings.success === false) {
      setShowListingsError(true);
      return;
      }
      for (const listing of userListings) {
        const imageKeys = listing.imageKeys
        for (const key of imageKeys) {
          await fetch(`http://3.121.231.45:3000/api/images/delete/${key}`, {
            method: 'DELETE',
          });
        }
        await fetch(`http://3.121.231.45:3000/api/listing/delete/${listing._id}`, {
          method: 'DELETE',
        });
      }
      const res = await fetch(`http://3.121.231.45:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
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
      const res = await fetch(`http://3.121.231.45:3000/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://3.121.231.45:3000/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`http://3.121.231.45:3000/api/user/listings/${currentUser._id}`)
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      const listingsWithImages = await getListingsWithImages(data);
      setUserListings(listingsWithImages);
    } catch (error) {
      setShowListingsError(true);
    }
  };


  const handleDeleteListing = async (listingId) => {
    try {
        const listingToDelete = userListings.find((listing) => listing._id === listingId);
        if (!listingToDelete) {
          throw new Error("Listing not found");
        }
      const res = await fetch(`http://3.121.231.45:3000/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        return;
      }

      await Promise.all(listingToDelete.imageKeys.map(async (imageKey) => {
        await fetch(`http://3.121.231.45:3000/api/images/delete/${imageKey}`, {
          method: 'DELETE'
        });
      }));

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
          src={currentUser?.avatar || avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <input
          type='text'
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? "Loading.." : "Update"}
        </button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90 "
        to={"/create-listing"}>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer' >
          Sign out
        </span>
      </div>
          <p className='text-red-700 mt-5'>{error ? error : "" }</p>
          <p className='text-green-700 mt-5'>{updateSuccess ? "User is updated successfully!" : ""}</p>
          {/* {updateSuccess && <p className='text-green-700 mt-5'>User is updated successfully!</p>} */}
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
              <div className='flex flex-col item-center'>
                <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase'>
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                    <button className='text-green-700 uppercase'>Edit</button>    
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

