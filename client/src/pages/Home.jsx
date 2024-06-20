import React from 'react';
import ListingItem from '../components/ListingItem';

const Home = () => {
  const listings = [
    { id: 1, title: 'Beautiful Apartment', description: 'Spacious apartment with great views.', price: 1200 },
    { id: 2, title: 'Cozy Studio', description: 'Comfortable studio in a convenient location.', price: 800 },
    // Weitere Listings hier hinzufügen
  ];

  return (
    <div className="home-page">
      <h1>Featured Listings</h1>
      {listings.map(listing => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default Home;





