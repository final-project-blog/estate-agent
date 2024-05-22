import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"


const SignUp = () => {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault()
    try {
      const res = await fetch("api/auth/signup",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
        
    if (data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate("/signin");
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
  }
  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-10">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Write the User Name"
          className="border p-3 rounded-lg " id="username" onChange={handleChange} />
        <input type="email" placeholder="Write your email address"
          className="border p-3 rounded-lg " id="email" onChange={handleChange} />
        <input type="password" placeholder="Write a strong password"
          className="border p-3 rounded-lg " id="password" onChange={handleChange} />
        <button disabled={loading} className="bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-80">Sing UP</button>
      </form>
      <div className="flex gap-2 my-5">
        <p>Already have an account?</p> 
        <Link to={"/signin"}className="text-blue-500">Sign In </Link>
      </div>
    </div>
  )
}

export default SignUp