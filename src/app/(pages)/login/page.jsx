import React from 'react';

const LoginScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Login</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-bold mb-2 text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-4"
          >
            Login
          </button>
        </form>
        <p className="text-center text-white">
          Don't have an account?{' '}
          <a href="#" className="text-blue-300 hover:text-blue-500">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;