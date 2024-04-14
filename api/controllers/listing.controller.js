import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

/**
 * @desc Creates a new listing.
 * @param req The request object, containing the body of the listing to create.
 * @param res The response object, used to send the result of the creation.
 * @returns {Promise<void>} A promise that resolves when the product is created, or rejects with an error message.
*/
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Delete a listing by its id.
 * @param {Object} req - The request object, containing the id of the listing to delete.
 * @param {Object} res - The response object, used to send the result of the deletion.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the listing is deleted, or rejects with an error message.
*/
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Updates a listing by its id.
 * @param {Object} req - The request object, containing the id of the listing to update and the new data.
 * @param {Object} res - The response object, used to send the result of the update.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the listing is updated, or rejects with an error message.
*/
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Retrieves a listing by its id.
 * @param {Object} req - The request object, containing the id of the listing to retrieve.
 * @param {Object} res - The response object, used to send the result of the retrieval.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the listing is retrieved, or rejects with an error message.
*/
export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Retrieves listings based on query parameters.
 * @param {Object} req - The request object, containing query parameters.
 * @param {Object} res - The response object, used to send the result of the retrieval.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A promise that resolves when the listings are retrieved, or rejects with an error message.
*/
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
