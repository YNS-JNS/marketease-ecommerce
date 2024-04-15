# MERN Luxury Estate

Welcome to MERN Luxury Estate! This is a web application designed to facilitate the sale or rental of high-end apartments, flats, and villas online. Our goal is to streamline communication and trust between property owners and clients, providing a seamless experience for all parties involved.

## Table of Contents

- [MERN Luxury Estate](#mern-luxury-estate)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
    - [Then the server will listen on PORT: 3000 and client will listen on port 5173](#then-the-server-will-listen-on-port-3000-and-client-will-listen-on-port-5173)
  - [Testing](#testing)
  - [Author](#author)
  - [Learn More](#learn-more)
  - [Contributing](#contributing)

## Features

- **Property Listings**: Display high-quality listings for luxury apartments, flats, and villas.
- **User Authentication**: Implement secure authentication using JWT (JSON Web Tokens) and Firebase Google Authentication to allow users to log in and access personalized features.
- **Property Details**: Provide detailed information about each property, including descriptions, amenities, location, price, and images.
- **Search and Filter**: Enable users to search for properties based on location, price range, number of bedrooms/bathrooms, and other criteria. Implement filters to refine search results.
- **Booking and Reservation**: Allow users to book or request reservations for properties directly through the platform. Include a calendar feature to check availability.
- **Favorites and Saved Searches**: Enable users to save their favorite properties and searches for easy access later.
- **Messaging and Communication**: Facilitate communication between property owners and potential renters/buyers through a messaging system within the platform.
- **User Profiles**: Provide user profiles where users can manage their personal information, view their saved properties, and track their activity.
- **Admin Panel**: Create an admin dashboard to manage property listings, user accounts, messages, and other platform settings.
- **Responsive Design**: Ensure that the platform is responsive and accessible on various devices, including desktops, laptops, tablets, and smartphones.

## Technologies Used

- **MongoDB (mongose ODM)**: NoSQL database for data storage.
- **Express.js**: Framework for creating RESTful APIs.
- **React.js**: JavaScript library for building the user interface.
- **Node.js**: JavaScript runtime environment for server-side execution.
- **JWT** (JSON Web Tokens): Standard method for securing information exchanges between parties.
- **Redux Toolkit**: Tool for managing application state efficiently and predictably.
- **Redux Persist**: Persistent storage of Redux data.
- **Firebase**: Google's platform for mobile and web application development.
  - Google Authentication: User authentication with their Google account.
  - Image Storage: Storage and management of property images.
- **Git**: Version control system for collaboration and tracking code changes.
- **GitHub**: Code hosting platform for storage and management of Git repositories.
- **Render**: Deployment platform for deploying the web application.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/YNS-JNS/mern-luxury-estate
```

2. Install dependencies:

```bash
   npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```bash	
MONGO=<your-mongodb-uri>
PORT=<your-port>
JWT_SECRET=<your-secret-key>
```

4. Navigate to the client folder:

```bash
   cd client
```

5. Install dependencies:

```bash
   npm install
```

6. Create a new account or login with your account in Firebase then go to firebase console and make a new project.
Nb: you can follow the instructions here: https://blog.logrocket.com/user-authentication-firebase-react-apps/ or in any of the following places

7. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```bash	
VITE_FIREBASE_API_KEY=<your-mongodb-uri>
```

8. Then Navigate to the project directory:

```bash
   npm run starting
```
### Then the server will listen on PORT: 3000 and client will listen on port 5173

## Testing

Unit tests are implemented using Jest. To run the tests, use the following command:

```bash
npm test
```

## Author

This Project was created ✨ by :
- ***[AIT M'BAREK YOUNESS](https://github.com/YNS-JNS).***

## Learn More

- Node.js Documentation: [https://nodejs.org/docs/latest/api/](https://nodejs.org/docs/latest/api/)

## Contributing

If you find issues or want to contribute, follow these steps:

1. Fork the project.
2. Create a branch for your feature: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add New Feature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.
