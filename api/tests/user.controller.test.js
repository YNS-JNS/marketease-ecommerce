import * as userController from '../controllers/user.controller.js'; // Import the controller functions
import UserModel from '../models/user.model.js';
import ListingModel from '../models/listing.model.js';
import bcrypt from 'bcryptjs';

jest.mock('../models/user.model.js', () => ({
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findById: jest.fn(),
}));

jest.mock('../models/listing.model.js', () => ({
    find: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    hashSync: jest.fn(),
}));

describe('User Controller Tests', () => {

    /**
    * @testcase {updateUser}
    */
    describe('Update User', () => {

        /**
        * @test {should update a user by its ID}
        */
        test('should update a user by its ID', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'user_id' },
                body: { 
                    username: 'new_username', 
                    email: 'new_email@example.com', 
                    password: 'new_password', 
                    avatar: 'new_avatar_url' 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const updatedUser = {
                _doc: {
                    username: 'new_username', 
                    email: 'new_email@example.com', 
                    avatar: 'new_avatar_url' 
                }
            };

            bcrypt.hashSync.mockReturnValue('hashed_password');
            UserModel.findByIdAndUpdate.mockResolvedValueOnce(updatedUser);

            await userController.updateUser(req, res, next);

            expect(bcrypt.hashSync).toHaveBeenCalledWith('new_password', 10);
            expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith('user_id', {
                $set: {
                    username: 'new_username',
                    email: 'new_email@example.com',
                    password: 'hashed_password',
                    avatar: 'new_avatar_url',
                },
            }, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedUser._doc);
        });

        /**
        * @test {should return an error if user is not authorized to update the account}
        */
        test('should return an error if user is not authorized to update the account', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'another_user_id' },
                body: { 
                    username: 'new_username', 
                    email: 'new_email@example.com', 
                    password: 'new_password', 
                    avatar: 'new_avatar_url' 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await userController.updateUser(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 401, message: 'You can only update your own account!' });
        });
    });

    /**
    * @testcase {deleteUser}
    */
    describe('Delete User', () => {

        /**
        * @test {should delete a user by its ID}
        */
        test('should delete a user by its ID', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'user_id' }
            };
            const res = { 
                status: jest.fn().mockReturnThis(), 
                json: jest.fn(),
                clearCookie: jest.fn()
            };
            const next = jest.fn();

            UserModel.findByIdAndDelete.mockResolvedValueOnce();
            await userController.deleteUser(req, res, next);

            expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith('user_id');
            expect(res.clearCookie).toHaveBeenCalledWith('access_token');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('User has been deleted!');
        });

        /**
        * @test {should return an error if user is not authorized to delete the account}
        */
        test('should return an error if user is not authorized to delete the account', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'another_user_id' }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await userController.deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 401, message: 'You can only delete your own account!' });
        });
    });

    /**
    * @testcase {getUserListings}
    */
    describe('Get User Listings', () => {

        /**
        * @test {should retrieve user listings by user ID}
        */
        test('should retrieve user listings by user ID', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'user_id' }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const listings = [{ _id: 'listing_id', name: 'Test Listing 1' }, { _id: 'listing_id_2', name: 'Test Listing 2' }];
            ListingModel.find.mockResolvedValueOnce(listings);

            await userController.getUserListings(req, res, next);

            expect(ListingModel.find).toHaveBeenCalledWith({ userRef: 'user_id' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(listings);
        });

        /**
        * @test {should return an error if user is not authorized to view the listings}
        */
        test('should return an error if user is not authorized to view the listings', async () => {
            const req = { 
                params: { id: 'user_id' }, 
                user: { id: 'another_user_id' }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await userController.getUserListings(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 401, message: 'You can only view your own listings!' });
        });
    });

    /**
    * @testcase {getUser}
    */
    describe('Get User', () => {

        /**
        * @test {should retrieve a user by its ID}
        */
        test('should retrieve a user by its ID', async () => {
            const req = { params: { id: 'user_id' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const user = { _doc: { username: 'test_user', email: 'test@example.com', avatar: 'avatar_url' } };
            UserModel.findById.mockResolvedValueOnce(user);

            await userController.getUser(req, res, next);

            expect(UserModel.findById).toHaveBeenCalledWith('user_id');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(user._doc);
        });

        /**
        * @test {should return an error if user is not found}
        */
        test('should return an error if user is not found', async () => {
            const req = { params: { id: 'user_id' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            UserModel.findById.mockResolvedValueOnce(null);

            await userController.getUser(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 404, message: 'User not found!' });
        });
    });


});
