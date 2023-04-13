import React, {
  useState
} from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/all";

const INITIAL_FORM_STATE = {
  email: ""
}

const ForgotPassword = () => {
  const [ formState, setFormState] = useState(INITIAL_FORM_STATE);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleForgotPassword();
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
    console.log(formState);
  };

  return (
    <section className = "min-h-screen bg-[#141517]">
        <div className = "flex flex-col items-center justify-center px-6 py-8 mx-auto space-y-8 md:h-screen lg:py-0">
          <p className = "text-white font-bold text-4xl hover:cursor-pointer text-center">
            Anime<span className = "text-[#E6613E]">Lib</span>
          </p>
          <div className ="w-full bg-[#1A1B1E] rounded-lg border-2 border-[#444C56] md:mt-0 sm:max-w-md xl:p-0">
            <div className ="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className = "text-xl font-bold leading-tight tracking-tight text-center text-white">
                Forgot Password
              </p>
              <form 
                className = "space-y-4 md:space-y-6" 
                onSubmit = {(e) => {
                  handleSubmit(e);
                }}
              >
                <div>
                  <label 
                    htmlFor = "email" 
                    className = "block mb-2 text-sm font-medium text-white"
                  >
                    Email Address
                  </label>
                  <input 
                    type = "email"
                    name = "email" 
                    id = "email" 
                    className = "block w-full p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white rounded-lg" 
                    placeholder = "name@company.com" 
                    required
                    value = { formState.email }
                    onChange = {(e) => setFormState({
                      ...formState,
                      email: e.target.value
                    })}
                  />
                </div>
                <div className = "space-y-4">
                  <button 
                    className = "w-full text-white bg-[#E6613E] hover:bg-[#d44f2e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 select-none"
                    type = "submit"
                  >
                    Submit
                  </button>
                  <Link 
                    to = "/signin"
                    className = "flex flex-row items-center space-x-1 hover:underline text-white"
                  >
                    <IoIosArrowRoundBack className = "text-white text-2xl hover:cursor-pointer" />
                    <p className = "text-md">
                      Go back to sign in
                    </p>
                  </Link>
                    </div>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ForgotPassword;
