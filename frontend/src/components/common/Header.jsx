import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { FaUser,FaSignOutAlt} from "react-icons/fa";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/users/");
  };
  return (
    <div className="bg-dark-blue text-light-gray flex flex-row items-center justify-between p-4">
      <Link to="/" id="logo">
        <h1 className="font-thin text-2xl text-">SCRUM FLOW</h1>
      </Link>
      <nav>
        <ul className="flex flex-row gap-4">
          {user ? (
            <>
              <button onClick={() => setMenuOpen(!isMenuOpen)}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt="profile image" className="w-8 h-8 rounded-full"/>
                ) : (
                  <RxAvatar size={30} />
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute top-8 right-4 border-2  rounded-md shadow-2xl w-40 p-4 z-50 bg-light-gray">
                  <Link
                    to="/users/profile"
                    className="flex items-center mb-2 text-black hover:underline hover:text-olive-green"
                  >
                    <FaUser className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-black hover:underline hover:text-olive-green"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/users/login">
                <li className="hover:text-olive-green">Sign In</li>
              </Link>
              <Link to="/users/">
                <li className="hover:text-olive-green">Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
