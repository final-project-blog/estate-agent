export const getListingsWithImages = async (data) => {
    if (Array.isArray(data)) {
        return await Promise.all(data.map(async (listing) => {
            const imageUrls = await Promise.all(listing.imageKeys.map(async (imageKey) => {
            const imageRes = await fetch(`/api/images/Url/${imageKey}`);
            const imageData = await imageRes.json();
            return imageData.imageUrl;
            }));
        return { ...listing, imageUrls };
        }));
    } else {
        const imageUrls = await Promise.all(data.imageKeys.map(async (imageKey) => {
        const imageRes = await fetch(`/api/images/Url/${imageKey}`);
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
        const response = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData,
        });
    const result = await response.json();
    console.log('Image uploaded successfully:', result);
    return result.imageKey;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; 
    }
};
