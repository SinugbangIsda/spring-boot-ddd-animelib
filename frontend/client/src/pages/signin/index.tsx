import React from 'react';
import { FcGoogle } from "react-icons/all";
import { Link } from "react-router-dom";

const Signin = () => {
  const handleSigninWithGoogle = () => {
    console.log("Signin with Google");
  }

  const handleSigninWithEmail = () => {
    console.log("Signin with Email");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSigninWithEmail();
  }

  return (
    <section className = "min-h-screen bg-[#22272E]">
      <div className ="flex flex-col items-center justify-center px-6 py-8 mx-auto space-y-8 md:h-screen lg:py-0">
        <Link to = "/signin">
          <p className = "text-white font-bold text-4xl hover:cursor-pointer text-center">
            Anime<span className = "text-[#E6613E]">Lib</span>
          </p>
        </Link>
        <div className ="w-full bg-[#2D333B] rounded-lg border-2 border-[#444C56] md:mt-0 sm:max-w-md xl:p-0">
          <div className ="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className = "text-xl font-bold leading-tight tracking-tight text-center text-white">
              Sign in to your account
            </p>
            <form 
              className = "space-y-4 md:space-y-6" 
              onSubmit = {(e) => {
                handleSubmit(e);
              }}
            >
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Address
                </label>
                <input type="email" name="email" id="email" className ="block w-full p-2.5 bg-[#373E47] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" placeholder="name@company.com" required/>
              </div>
              <div>
                <label htmlFor="password" className ="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className ="block w-full p-2.5 bg-[#373E47] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" required/>
              </div>
              <div className ="flex items-center justify-between">
                <div className ="flex items-start">
                  <div className ="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className ="w-4 h-4 accent-[#373E47]" />
                  </div>
                  <div className ="ml-3 text-sm">
                    <label htmlFor ="remember" className ="text-gray-500 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                </div>
                <p className ="text-sm font-medium text-primary-600 hover:underline text-white">
                  <Link to = "/forgotpassword">
                    Forgot password?
                  </Link>
                </p>
              </div>
              <div className = "space-y-4">
                <button 
                  className ="w-full text-white bg-[#E6613E] hover:bg-[#d44f2e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 select-none"
                  type = "submit"
                >
                  Sign in
                </button>
                <div className ="flex items-center justify-center select-none">
                  <hr className ="w-full border-gray-300 dark:border-gray-600" />
                  <p className ="mx-3 text-sm font-medium text-gray-500 dark:text-gray-400">or</p>
                  <hr className ="w-full border-gray-300 dark:border-gray-600" />
                </div>
                <button 
                  className = "w-full flex flex-row justify-center items-center space-x-4 rounded-lg bg-white p-2.5 hover:bg-[#f5f1f1] select-none"
                  type = "button"
                  onClick = { handleSigninWithGoogle }
                >
                  <FcGoogle className = "w-6 h-6 text-[#E6613E]"/>
                  <p className = "text-black font-medium text-md">Sign in with Google</p>
                </button>
                <p className ="text-sm font-light text-gray-400">
                  <Link to = "/signup">
                    Don't have an account yet? <span className ="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin;
