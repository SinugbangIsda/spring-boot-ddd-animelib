import React, { 
  useContext,
  useState
} from 'react';
import { FcGoogle } from "react-icons/all";
import { 
  Link, 
  Navigate 
} from "react-router-dom";
import { GlobalContext } from '../../context/global';

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
}

const Signin = () => {
  const [ formState, setFormState ] = useState(INITIAL_FORM_STATE);
  const { data, dispatch } = useContext(GlobalContext);
  const { userId } = data;

  const handleSigninWithGoogle = () => {
    console.log("Signin with Google");
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        userId: "1234567890"
      }
    });
  }

  const handleSigninWithEmail = () => {
    console.log("Signin with Email");
    console.log(formState);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSigninWithEmail();
  }

  if (userId === null) {
    return (
      <section className = "min-h-screen bg-[#22272E]">
        <div className ="flex flex-col items-center justify-center px-6 py-8 mx-auto space-y-8 md:h-screen lg:py-0">
          <p className = "text-white font-bold text-4xl select-none text-center">
            Anime<span className = "text-[#E6613E]">Lib</span>
          </p>
          <div className ="w-full bg-[#2D333B] rounded-lg border-2 border-[#444C56] md:mt-0 sm:max-w-md xl:p-0">
            <div className ="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className = "text-xl font-bold leading-tight tracking-tight text-center text-white select-none">
                Sign in to your account
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
                    className = "block mb-2 text-sm font-medium text-white select-none"
                  >
                    Email Address
                  </label>
                  <input 
                    type = "email" 
                    name = "email" 
                    id = "email" 
                    className = "block w-full p-2.5 bg-[#373E47] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg" 
                    placeholder = "name@company.com" 
                    value = { formState.email }
                    onChange = {(e) => setFormState({
                      ...formState,
                      email: e.target.value
                    })}
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor = "password" 
                    className = "block mb-2 text-sm font-medium text-white select-none"
                  >
                    Password
                  </label>
                  <input 
                    type = "password" 
                    name = "password" 
                    id = "password" 
                    placeholder = "••••••••" 
                    value = { formState.password }
                    className = "block w-full p-2.5 bg-[#373E47] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                    required
                    onChange = {(e) => setFormState({
                      ...formState,
                      password: e.target.value
                    })}
                  />
                </div>
                <div className = "flex items-center justify-between">
                  <div className = "flex items-start">
                    <div className = "flex items-center h-5">
                      <input 
                        id = "remember" 
                        name = "remember"
                        type = "checkbox" 
                        className = "w-4 h-4 accent-[#E6613E]" 
                      />
                    </div>
                    <div className = "ml-2 text-sm">
                      <label 
                        htmlFor = "remember" 
                        className = "text-gray-300 select-none"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <p className = "text-sm font-medium text-primary-600 hover:underline text-white select-none">
                    <Link to = "/forgotpassword">
                      Forgot password?
                    </Link>
                  </p>
                </div>
                <div className = "space-y-4">
                  <button 
                    className = "w-full text-white bg-[#E6613E] hover:bg-[#d44f2e] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2.5 select-none"
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
                    <p className = "text-black font-medium text-md">
                      Sign in with Google
                    </p>
                  </button>
                  <p className ="text-sm font-light text-gray-400 select-none">
                    Don't have an account yet? <Link to = "/signup"><span className ="font-medium hover:underline text-primary-500">Sign up</span></Link>
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

export default Signin;
