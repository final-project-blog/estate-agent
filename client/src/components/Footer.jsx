
const Footer = () => {
    return (
        <footer className="bg-slate-800 text-white py-8 rounded-lg">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h2 className="text-xl font-bold mb-4">About Us</h2>
                <p>
                        Welcome to <strong>Your Estate Agent</strong>, 
                        <br />your premier destination for all things real estate. 
                        <br /> Whether you are looking to buy, sell, or rent a property,
                        <br /> we are committed to providing you with exceptional service and unparalleled expertise in the real estate market.
                </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <ul>
                <li className="mb-2">
                <a href="/" className="hover:text-gray-400">Home</a>
                </li>
                <li className="mb-2">
                <a href="/about" className="hover:text-gray-400">About Us</a>
                </li>
                <li className="mb-2">
                <a href="/services" className="hover:text-gray-400">Services</a>
                </li>
                <li className="mb-2">
                <a href="/contact" className="hover:text-gray-400">Contact</a>
                </li>
                </ul>
            </div>
            <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Contact Us</h2>
            <p>123 Real Estate St.</p>
            <p>City, State, 12345</p>
            <p>Email: info@realestateapp.com</p>
            <p>Phone: (xxx) xx-xxx-xxx</p>
            <div className="mt-4 flex space-x-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.731 0-1.325.594-1.325 1.325v21.351c0 .73.594 1.324 1.325 1.324h11.483v-9.29h-3.124v-3.622h3.124v-2.672c0-3.1 1.892-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.239l-1.918.001c-1.504 0-1.795.714-1.795 1.76v2.317h3.587l-.467 3.622h-3.12v9.29h6.116c.73 0 1.325-.594 1.325-1.324v-21.35c0-.731-.595-1.325-1.325-1.325z"/></svg>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.896-.957-2.173-1.555-3.591-1.555-2.717 0-4.917 2.201-4.917 4.917 0 .39.045.765.127 1.124-4.083-.205-7.699-2.159-10.125-5.134-.422.725-.666 1.561-.666 2.457 0 1.697.861 3.197 2.169 4.076-.8-.026-1.555-.244-2.212-.609v.061c0 2.367 1.683 4.345 3.918 4.788-.41.111-.843.171-1.29.171-.315 0-.624-.031-.924-.088.631 1.953 2.457 3.376 4.617 3.415-1.69 1.326-3.827 2.115-6.144 2.115-.399 0-.79-.023-1.175-.069 2.188 1.401 4.786 2.213 7.582 2.213 9.096 0 14.073-7.532 14.073-14.073 0-.214-.005-.428-.014-.641.964-.697 1.8-1.562 2.465-2.549z"/></svg>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.31 3.608 1.285.975.975 1.222 2.241 1.285 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.062 1.366-.31 2.633-1.285 3.608-.975.975-2.241 1.222-3.608 1.285-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.069c-1.366-.062-2.633-.31-3.608-1.285-.975-.975-1.222-2.241-1.285-3.608-.058-1.265-.069-1.645-.069-4.849s.012-3.584.069-4.849c.062-1.366.31-2.633 1.285-3.608.975-.975 2.241-1.222 3.608-1.285 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.67.012-4.947.071-1.423.065-2.677.334-3.699 1.357s-1.292 2.276-1.357 3.699c-.059 1.277-.071 1.688-.071 4.947s.012 3.67.071 4.947c.065 1.423.334 2.677 1.357 3.699s2.276 1.292 3.699 1.357c1.277.059 1.688.071 4.947.071s3.67-.012 4.947-.071c1.423-.065 2.677-.334 3.699-1.357s1.292-2.276 1.357-3.699c.059-1.277.071-1.688.071-4.947s-.012-3.67-.071-4.947c-.065-1.423-.334-2.677-1.357-3.699s-2.276-1.292-3.699-1.357c-1.277-.059-1.688-.071-4.947-.071zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zm0 10.162a3.998 3.998 0 1 1 0-7.996 3.998 3.998 0 1 1 0 7.996zm6.406-11.845a1.44 1.44 0 1 0 0-2.881 1.44 1.44 0 1 0 0 2.881z"/></svg>
                </a>
            </div>
            </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
            <p>&copy; {new Date().getFullYear()} Your Estate Agent. All rights reserved.</p>
        </div>
        </div>
    </footer>
    );
};

export default Footer;
