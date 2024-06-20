import Listing from '../models/listing.model.js';
import errorHandler from '../utils/error.js';

const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

const deleteListing = async (req, res, next) => {

    console.log("req.user._id",req.user._id);
    const listing = await Listing.findById(req.params.id); 
    if (!listing) {
        return res.status(404).json('Listing not found'); 
    }

    if (req.user._id !== listing.userRef) {
        return next(errorHandler(401, 'You are not allowed to delete'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        next(error);
    }
};

    const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id); // findById statt find
    if (!listing) {
        return res.status(404).json('Listing not found'); // json statt direkt Text
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You are not allowed to update'));
    }

    try {
        await Listing.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Listing updated successfully' });
    } catch (error) {
        next(error);
    }
};

    const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id); // findById statt find
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

    const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.params.limit) || 9;
        const startIndex = parseInt(req.params.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished == 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'false') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            $text: { $search: searchTerm },
            type: type,
            offer: offer,
            furnished: furnished,
            parking: parking,
        })
            .sort({ [sort]: order })
            .skip(startIndex)
            .limit(limit);

        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};

export { createListing, deleteListing, updateListing, getListing, getListings};
