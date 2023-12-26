import React from "react";
import Header from "../components/common/Header.jsx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FrontIllustration from '../assets/FrontIllustration.jsx'
const Home = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-row ">
        <div className="w-full md:w-3/6 flex flex-col items-center justify-center px-8">
          <h2 className="text-4xl font-bold mb-2 text-center">Welcome to Scrum Flow</h2>
          <h3 className="text-2xl font-bold mb-2 text-olive-green text-center">
            Your Agile Project Companion
          </h3>
          <p className="mx-4 my-8 text-center">
            Unlock the power of unparalleled project management with Scrum Flow.
            Designed for teams that thrive on efficiency, Scrum Flow is your
            go-to solution for embracing the Agile methodology.
          </p>
          {user ? (
            <Link to="/dashboard">
              <button className="border-2 border-olive-green text-olive-green rounded-2xl hover:bg-olive-green hover:text-light-gray font-bold p-2 px-4">
                Dashboard
              </button>
            </Link>
          ) : (
            <Link to="/users/">
              <button className="border-2 border-olive-green text-olive-green rounded-2xl hover:bg-olive-green hover:text-light-gray font-bold p-2 px-4">
                Get Started Today !
              </button>
            </Link>
          )}
        </div>
        <div className="w-3/6 hidden justify-center items-center md:flex">
        <FrontIllustration />
        </div>
      </div>
    </div>
  );
};

export default Home;
