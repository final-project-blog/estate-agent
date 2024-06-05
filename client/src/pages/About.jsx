import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 text-white">
      <div className="bg-white bg-opacity-75 p-12 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">About Us</h2>
        <p className="text-lg text-gray-800">
          At Estate Agent, we are dedicated to helping you find the perfect home. Our experienced team of real estate professionals is committed to providing exceptional service and personalized attention to meet all your real estate needs.
        </p>
        <p className="text-lg text-gray-800 mt-4">
          Whether you are buying, selling, or renting, we offer a wide range of services to guide you through every step of the process. Our mission is to make your real estate experience as smooth and stress-free as possible.
        </p>
      </div>
    </div>
  );
};

export default About;
