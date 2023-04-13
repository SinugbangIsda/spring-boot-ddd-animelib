import React, {
  useContext,
  useState
} from 'react';
import { FcGoogle } from "react-icons/all";
import { Link, Navigate } from "react-router-dom";
import { GlobalContext } from '../../context/global';

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
}

const Signup = () => {
  const [ formState, setFormState ] = useState(INITIAL_FORM_STATE);
  const { data } = useContext(GlobalContext);
  const { userId  } = data;

  const handleSignupWithGoogle = () => {
    console.log("Signup with Google");
  }

  const handleSignupWithEmail = () => {
    console.log("Signup with Email");
    console.log(formState);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignupWithEmail();
  }

  if (userId === null) {
    return (
      <section className = "min-h-screen bg-[#141517]">
        <div className = " flex flex-col items-center justify-center px-6 py-8 mx-auto space-y-8 grow">
          <p className = "text-white font-bold text-4xl text-center select-none">
            Anime<span className = "text-[#E6613E]">Lib</span>
          </p>
          <div className = "w-full bg-[#1A1B1E] rounded-lg border-2 border-[#383a40] md:mt-0 sm:max-w-md xl:p-0">
            <div className = "p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className = "text-xl font-bold leading-tight tracking-tight text-center text-white">
                Create your account
              </p>
              <form 
                className = "space-y-4 md:space-y-6" 
                onSubmit = {(e) => {
                  handleSubmit(e);
                }}
              >
                <div className = "flex flex-row justify-center items-center space-x-2">
                  <div>
                    <label 
                      htmlFor = "firstname"
                      className = "block mb-2 text-sm font-medium text-white"
                    >
                      First Name
                    </label>
                    <input 
                      type = "text" 
                      name = "firstname" 
                      id = "firstname" 
                      className = "block w-full p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
                      placeholder = "James" 
                      required
                      value = { formState.firstName }
                      onChange = {(e) => setFormState({
                        ...formState,
                        firstName: e.target.value
                      })}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor = "firstname" 
                      className = "block mb-2 text-sm font-medium text-white"
                    >
                      Last Name 
                    </label>
                    <input 
                      type = "text" 
                      name = "lastname" 
                      id = "lastname" 
                      className = "block w-full p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
                      placeholder = "Weed" 
                      required
                      value = { formState.lastName }
                      onChange = {(e) => setFormState({
                        ...formState,
                        lastName: e.target.value
                      })}
                    />
                  </div>
                </div>
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
                    className = "block w-full p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
                    placeholder = "name@company.com" 
                    required
                    value = { formState.email }
                    onChange = {(e) => setFormState({
                      ...formState,
                      email: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label 
                    htmlFor = "password" 
                    className = "block mb-2 text-sm font-medium text-white"
                    >
                      Password
                  </label>
                  <input 
                    type = "password" 
                    name = "password" 
                    id = "password" 
                    placeholder = "••••••••" 
                    className = "block w-full p-2.5 bg-[#25262B] border-2 border-[#383a40] placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
                    required
                    value = { formState.password }
                    onChange = {(e) => setFormState({
                      ...formState,
                      password: e.target.value
                    })}
                  />
                </div>
                <div className = "space-y-4">
                  <button 
                    className = "w-full text-white bg-[#E6613E] hover:bg-[#d44f2e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 select-none"
                    type = "submit"
                  >
                    Sign up
                  </button>
                  <div className = "flex items-center justify-center select-none">
                    <hr className = "w-full border-gray-300 dark:border-gray-600" />
                    <p className = "mx-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                      or
                    </p>
                    <hr className = "w-full border-gray-300 dark:border-gray-600" />
                  </div>
                  <button 
                    className = "w-full flex flex-row justify-center items-center space-x-4 rounded-lg bg-white p-2.5 hover:bg-[#f5f1f1] select-none"
                    type = "button"
                    onClick = { handleSignupWithGoogle }
                  >
                    <FcGoogle className = "w-6 h-6 text-[#E6613E]"/>
                    <p className = "text-black font-medium text-md">
                      Sign up with Google
                    </p>
                  </button>
                  <p className ="text-sm font-light text-gray-400">
                    <Link to = "/signin">
                      Already have an account? <span className ="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  } else {
    return <Navigate to = "/"/>
  }
}

export default Signup;
