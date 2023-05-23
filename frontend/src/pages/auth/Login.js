import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LoginUser, reset, getMe} from '../../features/AuthSlice.js';

import InputField from '../../components/fields/InputField';
import Checkbox from '../../components/checkbox';
import authImg from "../../assets/img/auth/auth.png";
import LayoutAuth from '../../layouts/auth';
import logo from "../../assets/img/auth/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isError, isSuccess, isLoading, message} = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(user || isSuccess){
      navigate("/dataUser");
    }
    else{
      dispatch(reset())
    }
    
  },[user, isSuccess, dispatch, navigate])

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({email, password}));
  }

  return (
    <div>
      <LayoutAuth>
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            {/* Sign in section */}
            <form onSubmit={Auth}>
              <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                  <div className='w-full flex justify-center mb-4'>
                    <img src={logo} className='max-w-[5rem]' />
                  </div>
                  <hr className='mb-4'/>
                  <p className="mb-9 ml-1 text-base text-white bg-red-500 px-4 rounded-md">
                  {message}
                  </p>
                  {/* Email */}
                  <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Email*"
                  placeholder="mail@kopkarla.co.id"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />

                  {/* Password */}
                  <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Password*"
                  placeholder="Min. 8 characters"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  />
                  {/* Checkbox */}
                  <div className="mb-4 flex items-center justify-between px-2">
                  <div className="flex items-center mx-2">
                      <Checkbox />
                      <p className="ml-2 text-xs font-medium text-navy-700 dark:text-white">
                      Keep me logged In
                      </p>
                  </div>
                  <a
                      className="text-xs font-medium text-brand-500 hover:text-brand-600 dark:text-white  mx-2"
                      href=" "
                  >
                      Forgot Password?
                  </a>
                  </div>
                  <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                  {isLoading ? 'Loading...' : 'Login'}
                  </button>
                  <div className="mt-4">
                  </div>
              </div>
            </form>
        </div>
      </LayoutAuth>
    </div>
    
  )
}

export default Login