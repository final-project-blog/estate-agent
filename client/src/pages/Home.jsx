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

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className='bg-blue-900 text-gray-800'>
      {/* Top-Bereich */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-5xl lg:text-7xl font-bold text-gray-900'>
          Finde dein nächstes <span className='text-yellow-300'>perfektes</span>
          <br />
          Zuhause mit Leichtigkeit
        </h1>
        <div className='text-gray-400 text-base lg:text-lg'>
          EstateAgent ist der beste Ort, um dein nächstes perfektes Zuhause zu finden.
          <br />
          Wir haben eine breite Palette von Immobilien zur Auswahl.
        </div>
        <Link
          to={'/search'}
          className='text-base lg:text-lg text-blue-800 font-bold hover:underline'
        >
          Jetzt starten...
        </Link>
      </div>

      {/* Swiper für Angebote */}
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

      {/* Auflistung der Angebote, Mieten und Verkäufe */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-gray-600'>Aktuelle Angebote</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Mehr Angebote anzeigen</Link>
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
              <h2 className='text-2xl font-semibold text-gray-600'>Aktuelle Mietobjekte</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Mehr Mietobjekte anzeigen</Link>
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
              <h2 className='text-2xl font-semibold text-gray-600'>Aktuelle Verkaufsobjekte</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Mehr Verkaufsobjekte anzeigen</Link>
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


