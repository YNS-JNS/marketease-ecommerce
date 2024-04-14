import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutUserStart, deleteUserFailure, deleteUserSuccess } from '../redux/user/userSlice';


const Navbar = () => {

    // Test _________________________________
    const { currentUser } = useSelector((state) => state.user);
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const dispatch = useDispatch();

    const handleSignOut = async () => {
      try {
        dispatch(signOutUserStart());
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/signout`);
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        // dispatch(deleteUserFailure(data.message));
        dispatch(deleteUserFailure(error.message));
      } finally {
        window.location.reload();
      }
    };

    // ______________________________________


    return (
        <div>
            <div className="flex items-center justify-between h-16 bg-slate-100 border-b border-gray-200">
                <div className="flex items-center px-4">
                    <button className="text-gray-500 focus:outline-none focus:text-gray-700"
                    // onClick={onShow}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
                </div>
                <div className="flex items-center pr-4">

                    {/* Button show dropDown  */}
                    <div ref={profileRef} >
                        <button
                            type="button"
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="h-9 w-9 overflow-hidden rounded-full"
                        >
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        </button>
                    </div>
                </div>
               {/*  ____________________ dropdown profile ____________________   */}
        {profileOpen && (
          <div className="absolute right-5 mt-60 w-48 divide-y divide-gray-200 rounded-md border border-gray-200 bg-white shadow-md" ref={profileRef}>
            <div className="flex items-center space-x-2 p-2">
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
              <div className="font-medium"> {currentUser.username} </div>
            </div>

            <div className="flex flex-col space-y-3 p-2">
              <Link to={'/'} className="transition hover:text-blue-600">
                Home
              </Link>
              <Link to={'/dashboard/profile'} className="transition hover:text-blue-600">
                Edit Profile
              </Link>
            </div>

            <div className="p-2">
              <Link to={'/sign-in'}>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 transition hover:text-blue-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <div>Sign Out</div>
                </button>
              </Link>
            </div>
          </div>
        )}
            </div>
        </div>
    )
}

export default Navbar;