import React from 'react'
import InputField from '../../components/fields/InputField'
import Checkbox from '../../components/checkbox'
import LayoutAuth from '../../layouts/auth';

const Register = () => {
  return (
    <div>
        <LayoutAuth>
        <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
            {/* Sign in section */}
            <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                <h4 className="mb-10 text-4xl font-bold text-navy-700 dark:text-white">
                Register
                </h4>
                {/* Email */}
                <InputField
                variant="auth"
                extra="mb-3"
                label="Name*"
                placeholder="mail@simmmple.com"
                id="email"
                type="text"
                />

                <InputField
                variant="auth"
                extra="mb-3"
                label="Email*"
                placeholder="mail@simmmple.com"
                id="email"
                type="text"
                />

                {/* Password */}
                <InputField
                variant="auth"
                extra="mb-3"
                label="Password*"
                placeholder="Min. 8 characters"
                id="password"
                type="password"
                />

                {/* Conf Password */}
                <InputField
                variant="auth"
                extra="mb-10"
                label="Confirmation Password*"
                placeholder="Min. 8 characters"
                id="password"
                type="password"
                />
                <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                Register
                </button>
                <div className="mt-4">
                </div>
            </div>
        </div>
        </LayoutAuth>
    </div>
  )
}

export default Register