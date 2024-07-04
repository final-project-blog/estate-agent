const backendUrl = import.meta.env.BACKEND_URL

export const getListingsWithImages = async (data) => {
    if (Array.isArray(data)) {
        return await Promise.all(data.map(async (listing) => {
            const imageUrls = await Promise.all(listing.imageKeys.map(async (imageKey) => {
            const imageRes = await fetch(`http://3.79.18.231:3000/api/images/Url/${imageKey}`);
            const imageData = await imageRes.json();
            return imageData.imageUrl;
            }));
        return { ...listing, imageUrls };
        }));
    } else {
        const imageUrls = await Promise.all(data.imageKeys.map(async (imageKey) => {
        const imageRes = await fetch(`http://3.79.18.231:3000/api/images/Url/${imageKey}`);
        const imageData = await imageRes.json();
        return imageData.imageUrl;
        }));
        return { ...data, imageUrls };
    }
};

export const storeImage = async ({ image }) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
        const response = await fetch('http://3.121.231.45:3000/api/images/upload', {
            method: 'POST',
            body: formData,
        });
    const result = await response.json();
    return result.imageKey;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; 
    }
};
