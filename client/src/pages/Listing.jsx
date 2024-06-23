import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"




const Listing = () => {


    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchListing= async () => {
            try {
                setLoading(true)
                const response = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await response.json()
                console.log("data",data);
                if (data.success === false) {
                    setError(true)
                    setLoading(false)
                    return
                }
                console.log("data.imagekeys",data.imagekeys)
                const imageUrls = await Promise.all(
                    data.imageKeys.map(async (imageKey) => {
                        const imageRes = await fetch(`http://localhost:3000/api/images/Url/${imageKey}`);
                        const imageData = await imageRes.json();
                        console.log("imageData:", imageData);
                    return imageData.imageUrl;
                    })
                );
                const updatedData = { ...data, imageUrls };
                console.log("updatedData:", updatedData);
                setListing(updatedData)
                setLoading(false)
                setError(false)
                
            } catch (error) {
                setError(error);
                setLoading(false)
            }
        }
        fetchListing()
    }, [params.listingId])


  return (
    <main>
        {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
        {error && <p className="text-center my-7 text-2xl">Something went wrong</p>}
        {listing && !loading && !error && <h1>{listing.name}</h1>
       }
    </main>
  )
}

export default Listing