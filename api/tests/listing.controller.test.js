import * as listingController from '../controllers/listing.controller.js'; // Import the controller functions
import ListingModel from '../models/listing.model.js';


jest.mock('../models/listing.model.js', () => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
}));

describe('Product Controller Tests', () => {


    /**
    * @testcase {getListings}
    */
    describe('get All Listing', () => {

        /**
        * @test {should return all products}
        */
        test('should return all listing', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn(); // Mocking the next function

            const listings = [
                {
                    name: 'Test Product 1', description: 'desc test test', address: 'Test Category', regularPrice: 10,
                    discountPrice: 10, bathrooms: 10, bedrooms: 10, furnished: true, parking: true, type: 'Test Category', offer: true, imageUrls: 'Test Category', userRef: 'Test Category'
                },
                {
                    name: 'Test Product 2', description: 'desc test test', address: 'Test Category', regularPrice: 10,
                    discountPrice: 10, bathrooms: 10, bedrooms: 10, furnished: true, parking: true, type: 'Test Category', offer: true, imageUrls: 'Test Category', userRef: 'Test Category'
                },
            ];

            ListingModel.find.mockResolvedValueOnce(listings);

            // await listingController.getListings(req, res, next);
            await listingController.getListings(req, res, next);

            expect(ListingModel.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(listings);
        })
    });

    /**
    * @testcase {getProductById}
    */
    describe('get a Listing By Id', () => {

        /**
        * @test {should return product if ID is valid and product exists}
        */
        test('should return listing if ID is valid and listing exists', async () => {
            // Mock product data
            const listingData = {
                name: 'Test Product 1', description: 'desc test test', address: 'Test Category', regularPrice: 10,
                discountPrice: 10, bathrooms: 10, bedrooms: 10, furnished: true, parking: true, type: 'Test Category', offer: true, imageUrls: 'Test Category', userRef: 'Test Category'
            };

            // Mock request object
            const req = {
                params: { id: listingData._id }
            };

            // Mock response object
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            const next = jest.fn();

            // Mock ListingModel.findById to return product data
            ListingModel.findById.mockResolvedValueOnce(listingData);

            // Call the controller function
            await listingController.getListing(req, res, next);

            // Expectations
            expect(ListingModel.findById).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(listingData);
        });

        //     /**
        //     * @test {should return error if ID is not valid}
        //     */
        //     test('should return error if ID is not valid', async () => {
        //         const req = {
        //             body: {
        //                 name: 'Test Product',
        //                 price: 10,
        //                 category: 'Test Category'
        //             },
        //             params: { id: '5f77777777777777777777k' }
        //         };
        //         const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        //         await productController.getProductById(req, res);

        //         // Ensure ProductModel.findByIdAndUpdate is not called
        //         expect(ProductModel.findById).not.toHaveBeenCalledWith();

        //         expect(res.status).toHaveBeenCalledWith(400);
        //         expect(res.json).toHaveBeenCalledWith({
        //             status: 400,
        //             message: `Product Id = ${req.params.id} is invalid !`
        //         });
        //     });

        //     /**
        //     * @test {should return error if product is not found}
        //     */
        //     test('should return error if product is not found', async () => {
        //         // Mock request object
        //         const req = {
        //             params: { id: '5f7777777777777777777777' } // Non-existing ID
        //         };

        //         // Mock response object
        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn()
        //         };

        //         // Mock ProductModel.findById to return null, simulating product not found
        //         ProductModel.findById.mockResolvedValueOnce(null);

        //         // Call the controller function
        //         await productController.getProductById(req, res);

        //         // Expectations
        //         expect(ProductModel.findById).toHaveBeenCalledWith(req.params.id);
        //         expect(res.status).toHaveBeenCalledWith(404);
        //         expect(res.json).toHaveBeenCalledWith({
        //             message: 'Product not found'
        //         });
        //     });

        //     /**
        //     * @test {should return error if there is an internal server error}
        //     */
        //     test('should return error if there is an internal server error', async () => {
        //         // Mock request object
        //         const req = {
        //             params: { id: '5f7777777777777777777777' } // Existing ID
        //         };

        //         // Mock response object
        //         const res = {
        //             status: jest.fn().mockReturnThis(),
        //             json: jest.fn()
        //         };

        //         // Mock ProductModel.findById to throw an error, simulating an internal server error
        //         ProductModel.findById.mockRejectedValueOnce(new Error('Internal server error'));

        //         // Call the controller function
        //         await productController.getProductById(req, res);

        //         // Expectations
        //         expect(ProductModel.findById).toHaveBeenCalledWith(req.params.id);
        //         expect(res.status).toHaveBeenCalledWith(500);
        //         expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
        //     });
    });

});