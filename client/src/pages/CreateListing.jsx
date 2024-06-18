import { useState } from "react";
import axios from  "axios";

const CreateListing = () => {

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageKeys: [],
        imageUrl: [],
    });
    console.log("formData1:" ,formData);
    const [imageUploadError, setImageUploadError] = useState(false)
    const storeImage = async ({image}) => {
        const formData = new FormData()
        formData.append("image", image)
        // console.log(image)
        // console.log(formData)

        const result = await axios.post('http://localhost:3000/api/images/upload', formData, {
            headers: {
                'Content-Type': 'form-data'
            }
        })
        // console.log("imageKey:", result.data.imageKey)
        return result.data.imageKey
    }
    const getDownloadUrl = async (fileKey) => {
        const result = await axios.get(`http://localhost:3000/api/images/Url/${fileKey}`)
        return result.data.imageUrl
    }
    const UploadImages = async () => {
        if (files.length > 0 && files.length + formData.imageUrl.length < 7) {
            try {
                const keyPromises = [];
                for (let i = 0; i < files.length; i++) {
                    keyPromises.push(storeImage({ image: files[i] }));
                }
                const keys = await Promise.all(keyPromises);
                const updatedKeys = formData.imageKeys.concat(keys);
                setFormData(prevFormData => ({ ...prevFormData, imageKeys: updatedKeys }));
    
                const urlPromises = [];
                for (let j = 0; j < updatedKeys.length; j++) {
                    urlPromises.push(getDownloadUrl(updatedKeys[j]));
                }
                const urls = await Promise.all(urlPromises);
                const updatedUrls = formData.imageUrl.concat(urls);
                setFormData(prevFormData => ({ ...prevFormData, imageUrl: updatedUrls }));

                setImageUploadError(false);
            } catch (error) {
                console.error("Error uploading images: ", error);
                setImageUploadError("An error occurred while uploading images.");
            }
        } else {
            setImageUploadError("You can only upload 6 images per listing.");
        }
    }

    const handleRemoveImage = async (index) => {

        await axios.delete(`http://localhost:3000/api/images/delete/${formData.imageKeys[index]}`)
        console.log(formData.imageKeys[index])
        setFormData({
            ...formData,
            imageKeys: formData.imageKeys.filter((_, i) => i !== index),
            imageUrl: formData.imageUrl.filter((_, i) => i !== index),
        })
    };

    return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
        </h1>
        <form className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
                <input
                type="text"
                placeholder="Name"
                className="border p-3 rounded-lg"
                id="name"
                maxLength="62"
                minLength="10"
                required
                />
                <textarea
                type="text"
                placeholder="Description"
                className="border p-3 rounded-lg"
                id="description"
                required
                />
                <input
                type="text"
                placeholder="Address"
                className="border p-3 rounded-lg"
                id="address"
                required
                />
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className="w-5" />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className="w-5" />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parkin" className="w-5" />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className="w-5" />
                        <span>Furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className="w-5" />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input type="number" id="bedrooms" min="1" max="10" required
                        className="p-3 border border-gray-300 rounded-lg" />
                        <p>Beds</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="bathrooms" min="1" max="10" required
                        className="p-3 border border-gray-300 rounded-lg" />
                        <p>Baths</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="regularPrice" min="1" max="10" required
                        className="p-3 border border-gray-300 rounded-lg" />
                        <div className="flex flex-col items-center">
                            <p>Reguler Price</p>
                            <span className="text-xs">($/month)</span>
                        </div>
                        
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id="discountPrice" min="1" max="10" required
                        className="p-3 border border-gray-300 rounded-lg" />
                        <div className="flex flex-col items-center">
                            <p>Discount Price</p>
                            <span className="text-xs">($/month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Images:
                <span className="font-normal text-gray-600 ml-2">The first Image will be the Cover</span>
                </p>
                <div className="flex gap-4">
                    <input onChange={(e)=> setFiles(e.target.files)} className="p-3 border border-gray-300 rounded w-full"
                    type="file" id="images" accept="image/*" multiple required/>
                    <button type="button" onClick={UploadImages} className="p-3 text-green-700 border border-green-700 rounded
                    uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
                </div>
                <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrl.length > 0 && formData.imageUrl.map((url, index) => (
                        <div key={index} className="flex justify-between p-3 border items-center">
                            <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-lg" />
                            <button type="button" onClick={()=> handleRemoveImage (index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-80">Delete</button>
                        </div>
                    ))
                }
                <button className="p-3 bg-slate-700 text-white rounded-lg
                uppercase hover:opacity-90 disabled:opacity-75">Create Listing</button>
            </div>
        </form>
    </main>
    );
};

export default CreateListing;