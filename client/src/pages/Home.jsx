
const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600">
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-lg text-center">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Estate Agent" 
          className="w-32 h-32 mx-auto mb-6 rounded-full"
        />
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Estate Agent</h2>
        <p className="text-lg text-gray-800">
          We help you find your dream home. 
        </p>
      </div>
    </div>
  );
};

export default Home;
