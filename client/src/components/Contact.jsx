
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Contact({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState("")

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`http://3.121.231.45:3000/api/user/${listing.userRef}`)
                const data = await res.json()
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlord()
    }, [listing.userRef])
    console.log(landlord);
    console.log("listing.userRef", listing.userRef)
  return (
    <>
        {landlord && (
            <div className=' flex flex-col gap-2'>
                <p>Contact {" "} 
                    <span className=' font-semibold'>{landlord.username}</span> for {" "}
                    <span className=' font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea name="message" id="message" rows="3" value={message} onChange={onChange} 
                    placeholder='Enter your Message here...' className=' w-full border p-3 rounded-lg'></textarea>
                    <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} 
                    className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-90">
                        Send Message
                    </Link>
            </div>
        )}
    </>
  )
}

export default Contact