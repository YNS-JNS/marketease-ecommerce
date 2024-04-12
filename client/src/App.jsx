import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Layout from './components/shared/Layout';
import Stats from './components/Stats';

export default function App() {

  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route path='statistics' element={<Stats />} />
            <Route path='profile' element={<Profile />} />
            <Route path='create-listing' element={<CreateListing />} />
            <Route path='update-listing/:listingId' element={<UpdateListing />} />
          </Route>
        </Route>

      </Routes>
    </>

  );
}