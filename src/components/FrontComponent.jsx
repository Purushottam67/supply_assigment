/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../helpers/API";

const FrontComponent = ({ pgHeading, handleClick, response, setResponse }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
  });

  // handel state
  function handleChange(e) {
    setResponse("");
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleNewUserChange(e) {
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const URL = `${API}/signup/resendemail`;

  function resendEmail() {
    setResponse({ temp_message: "Resending Email" });
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.acknowledged) {
          setResponse({ message: data.message });
        } else {
          setResponse({ error: data.error });
        }
      })
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto bg-gray-100 rounded-lg shadow-lg max-w-md">
    <p className="text-lg font-bold mb-4">{pgHeading}</p>
  
    <div className="mb-4 w-full">
      <input
        type="text"
        className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Email Address"
        name="email"
        value={user.email}
        onChange={(e) => handleChange(e)}
      />
    </div>
  
    {pgHeading !== "Login" && (
      <>
        <div className="mb-4 w-full">
          <input
            type="text"
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="First Name"
            name="first_name"
            value={newUser.first_name}
            onChange={(e) => handleNewUserChange(e)}
          />
        </div>
  
        <div className="mb-4 w-full">
          <input
            type="text"
            className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Last Name"
            name="last_name"
            value={newUser.last_name}
            onChange={(e) => handleNewUserChange(e)}
          />
        </div>
      </>
    )}
  
    <div className="mb-4 w-full">
      <input
        type="password"
        className="w-full h-10 px-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Password"
        name="password"
        value={user.password}
        onChange={(e) => handleChange(e)}
      />
    </div>
  
    {response.error && (
      <p className="text-xs text-center text-red-500 mb-4">
        {response.error}{" "}
        {response.active ? (
          <button
            className="text-cyan-700"
            onClick={() => resendEmail()}
          >
            Resend Email
          </button>
        ) : (
          ""
        )}
      </p>
    )}
  
    {response.data && (
      <p className="text-xs text-center text-green-500 mb-4">{response.data}</p>
    )}
  
    {response.message && (
      <p className="text-xs text-center text-green-500 mb-4">
        <p>Confirmation email has been sent</p>
        <p>Verify your account to login</p>
      </p>
    )}
  
    {response.temp_message && (
      <p className="text-xs text-center text-green-500 mb-4">
        {response.temp_message}
      </p>
    )}
  
    <button
      type="button"
      className="w-full px-5 py-2 text-sm font-medium text-white bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none focus:border-blue-500"
      onClick={
        pgHeading === "Login"
          ? () => {
              setResponse({ temp_message: "Logging In..." });
              handleClick(user);
            }
          : () => {
              setResponse({ temp_message: "Registering user...." });
              handleClick({
                ...user,
                ...newUser,
              });
            }
      }
    >
      {pgHeading === "Login" ? "Sign In" : "Sign Up"}
    </button>
  
    {pgHeading === "Login" && (
      <button
        onClick={() => navigate("/forgot")}
        className="text-xs text-blue-500 mt-2"
      >
        Forgot Password?
      </button>
    )}
  
    <div className="flex items-center justify-center mt-4">
      <div className="flex-grow h-px bg-gray-300"></div>
      <div className="mx-2 text-sm">OR</div>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  
    <p className="text-sm mt-4">
      {pgHeading === "Login" ? "Don't have an account?" : "Have an account?"}
      <button
        onClick={() => navigate(pgHeading === "Login" ? "/register" : "/")}
        className="ml-1 font-semibold text-blue-500"
      >
        {pgHeading === "Login" ? "Sign up" : "Log in"}
      </button>
    </p>
  </div>
  );
};

export default FrontComponent;
