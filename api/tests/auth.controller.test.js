import * as authController from '../controllers/auth.controller.js'; // Import the controller functions
import UserModel from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../models/user.model.js', () => ({
    findOne: jest.fn(),
    save: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
    hashSync: jest.fn(),
    compareSync: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));

jest.mock('../utils/error.js', () => ({
    errorHandler: jest.fn(),
}));

describe('Auth Controller Tests', () => {

    /**
    * @testcase {signup}
    */
    describe('Signup', () => {

        /**
        * @test {should create a new user}
        */
        test('should create a new user', async () => {
            const req = { 
                body: { 
                    username: 'test_user', 
                    email: 'test@example.com', 
                    password: 'test_password' 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            bcrypt.hashSync.mockReturnValue('hashed_password');
            UserModel.save.mockResolvedValueOnce();
            
            await authController.signup(req, res, next);

            expect(bcrypt.hashSync).toHaveBeenCalledWith('test_password', 10);
            expect(UserModel.save).toHaveBeenCalledWith({
                username: 'test_user',
                email: 'test@example.com',
                password: 'hashed_password',
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith('User created successfully!');
        });

        /**
        * @test {should handle errors during signup}
        */
        test('should handle errors during signup', async () => {
            const req = { 
                body: { 
                    username: 'test_user', 
                    email: 'test@example.com', 
                    password: 'test_password' 
                } 
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            bcrypt.hashSync.mockReturnValue('hashed_password');
            UserModel.save.mockRejectedValueOnce('Error during save');
            const error = new Error('Error during save');
            authController.errorHandler.mockReturnValue(error);

            await authController.signup(req, res, next);

            expect(bcrypt.hashSync).toHaveBeenCalledWith('test_password', 10);
            expect(UserModel.save).toHaveBeenCalledWith({
                username: 'test_user',
                email: 'test@example.com',
                password: 'hashed_password',
            });
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    /**
    * @testcase {signin}
    */
    describe('Signin', () => {

        /**
        * @test {should sign in a user}
        */
        test('should sign in a user', async () => {
            const req = { body: { email: 'test@example.com', password: 'test_password' } };
            const res = { 
                cookie: jest.fn().mockReturnThis(), 
                status: jest.fn().mockReturnThis(), 
                json: jest.fn() 
            };
            const next = jest.fn();

            const validUser = { 
                _id: 'user_id', 
                password: 'hashed_password', 
                username: 'test_user', 
                email: 'test@example.com' 
            };
            UserModel.findOne.mockResolvedValueOnce(validUser);
            bcrypt.compareSync.mockReturnValueOnce(true);
            jwt.sign.mockReturnValueOnce('mock_token');
            const { password, ...rest } = validUser;
            
            await authController.signin(req, res, next);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(bcrypt.compareSync).toHaveBeenCalledWith('test_password', 'hashed_password');
            expect(jwt.sign).toHaveBeenCalledWith({ id: 'user_id' }, process.env.JWT_SECRET);
            expect(res.cookie).toHaveBeenCalledWith('access_token', 'mock_token', { httpOnly: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(rest);
        });

        /**
        * @test {should handle errors during signin}
        */
        test('should handle errors during signin', async () => {
            const req = { body: { email: 'test@example.com', password: 'test_password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            UserModel.findOne.mockRejectedValueOnce('Error during findOne');
            const error = new Error('Error during findOne');
            authController.errorHandler.mockReturnValue(error);

            await authController.signin(req, res, next);

            expect(UserModel.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    /**
    * @testcase {google}
    */
    describe('Google Auth', () => {

        /**
        * @test {should authenticate a user with Google}
        */
        test('should authenticate a user with Google', async () => {
            // Add your test case here
        });

        /**
        * @test {should handle errors during Google authentication}
        */
        test('should handle errors during Google authentication', async () => {
            // Add your test case here
        });
    });

    /**
    * @testcase {signOut}
    */
    describe('Sign Out', () => {

        /**
        * @test {should sign out a user}
        */
        test('should sign out a user', async () => {
            const req = {};
            const res = { clearCookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            await authController.signOut(req, res, next);

            expect(res.clearCookie).toHaveBeenCalledWith('access_token');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith('User has been logged out!');
        });

        /**
        * @test {should handle errors during sign out}
        */
        test('should handle errors during sign out', async () => {
            const req = {};
            const res = { clearCookie: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();

            const error = new Error('Error during sign out');
            res.clearCookie.mockImplementation(() => {
                throw error;
            });

            await authController.signOut(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

});
