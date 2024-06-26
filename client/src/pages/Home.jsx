import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  
  SwiperCore.use([Navigation]);

  const getListingsWithImages = async (listings) => {
    return await Promise.all(listings.map(async (listing) => {
        const imageUrls = await Promise.all(listing.imageKeys.map(async (imageKey) => {
            const imageRes = await fetch(`/api/images/Url/${imageKey}`);
            const imageData = await imageRes.json();
            return imageData.imageUrl;
        }));
        return { ...listing, imageUrls };
    }));
};

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        const listingsWithImages = await getListingsWithImages(data);
        setOfferListings(listingsWithImages);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        const listingsWithImages = await getListingsWithImages(data);
        setRentListings(listingsWithImages);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        const listingsWithImages = await getListingsWithImages(data);
        setSaleListings(listingsWithImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className=''>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className=' text-slate-700 font-bold text-3xl lg:text-6xl'>Your <span className="text-slate-500">Dream Home</span> is here ...</h1>
        <h1 className=" text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your <span className="text-slate-500">perfect</span>
          <br />
          Place with ease
        </h1>
        <div className=' text-gray-400 text-xs sm:text-sm'>
          Your Estate Agent will help you find your Home fast, easy and comfortable.
          <br />
          Our Expert support is between your Hands.
        </div>
        <Link
          to={'/search'}
          className=' text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Search now...
        </Link>
      </div>

      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              {listing.imageUrls && listing.imageUrls[0] ? (
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[500px]'
                ></div>
              ) : (
                <div className='h-[500px] flex items-center justify-center text-white'>
                  No Image Available
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more Offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-gray-600'>Recent Places for Rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more Places for Rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-gray-600'>Recent Places for Sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more Places for Sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


