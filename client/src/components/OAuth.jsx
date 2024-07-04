


const OAuth = () => {
    const handleGoogleClick = async () => {
        try {
            window.location.href = "http://http://3.79.18.231:3000/api/auth/google";
        } catch (error) {
            console.log(" could not connect to Google", error);
        }
    };
  return (
    <button onClick={handleGoogleClick} type="button" 
    className ="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
    Continue With Google</button>
  )
}

export default OAuth