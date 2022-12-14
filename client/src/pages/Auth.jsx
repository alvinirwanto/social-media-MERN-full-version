import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../img/logo.png'
import { UilEye } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { logIn } from '../action/AuthAction'
import { signUp } from '../action/AuthAction'

const Auth = () => {
    // Redux
    const dispatch = useDispatch()

    const loading = useSelector((state) => state.authReducer.loading)
    console.log(loading)

    // For Sign up and Login card
    const [isSignUp, setIsSignUp] = useState(false)

    // For eye icon in password field
    const [visiblePass, setVisiblePass] = useState(false)
    const [visibleConPass, setVisibleConPass] = useState(false)

    // For compare the password and the confirm password
    const [confirmPass, setConfirmPass] = useState(true)

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: ""
    })

    // For change the value
    const handleChange = (e) => {
        // this convention to make handle change for every input separetely 
        setData({ ...data, [e.target.name]: e.target.value })
    }

    // Handle when submit
    const handleSubmit = (e) => {
        e.preventDefault()

        // Call the setConfirmPass to compare
        if (isSignUp) {
            // if (data.password !== data.confirmpass) {
            //     setConfirmPass(false)
            // }
            data.password === data.confirmpass
                ? dispatch(signUp(data))
                : setConfirmPass(false)
        } else {
            dispatch(logIn(data))
        }
    }

    // Reset form when change from login to signup and vice versa
    const resetForm = () => {
        setConfirmPass(true)
        setData({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpass: ""
        })
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 px-4 h-screen gap-0 xl:gap-9 relative max-w-[1200px] mx-auto'>
            {/* Left Side */}
            <div className='flex justify-center items-center gap-6'>
                <img src={Logo} alt="logo" className='w-[8rem] h-[7rem]' />
                <div>
                    <p className='text-4xl font-extrabold'>AL Media</p>
                    <p className='text-lg text-gray-500'>Explore the ideas throughout the world</p>
                </div>
            </div>


            {/* Right Side */}
            <div className='flex items-center justify-center mt-[-17rem] xl:mt-0'>
                <div className='bg-[color:var(--card-color)] p-4 md:p-[3rem] xl:p-[3.5rem] py-9 rounded-md w-[35rem]'>
                    <form action="" className='flex flex-col gap-8' onSubmit={handleSubmit}>
                        <h3 className='text-center py-4 text-3xl text-[#ff5851] font-bold'>{isSignUp ? "Sign Up" : "Log In"}</h3>
                        <div className='flex flex-col gap-4'>

                            {isSignUp && (
                                <div className='grid grid-cols-2 gap-4'>
                                    <input type="text"
                                        placeholder='First Name'
                                        className='infoInput'
                                        name='firstname'
                                        onChange={handleChange}
                                        value={data.firstname}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        className='infoInput'
                                        name='lastname'
                                        onChange={handleChange}
                                        value={data.lastname}
                                    />
                                </div>
                            )}

                            <input
                                type="text"
                                placeholder='Username'
                                className='infoInput'
                                name='username'
                                onChange={handleChange}
                                value={data.username}
                            />

                            <div className='flex items-center w-full'>
                                <input
                                    type={visiblePass ? "password" : "text"}
                                    placeholder='Password'
                                    className='infoInput bg-gray-100 border-0 outline-none w-full'
                                    name='password'
                                    onChange={handleChange}
                                    value={data.password}
                                />
                                <div className='cursor-pointer ml-[-2.5rem]' onClick={() => setVisiblePass((prev) => !prev)}>
                                    {visiblePass ? <UilEye /> : <UilEyeSlash />}
                                </div>
                            </div>


                            {isSignUp && (
                                <div className='flex items-center w-full'>
                                    <input
                                        type={visibleConPass ? "password" : "text"}
                                        placeholder='Confirm Password'
                                        className='infoInput bg-gray-100 border-0 outline-none w-full'
                                        name='confirmpass'
                                        onChange={handleChange}
                                        value={data.confirmpass}
                                    />
                                    <div className='cursor-pointer ml-[-2.5rem]' onClick={() => setVisibleConPass((prev) => !prev)}>
                                        {visibleConPass ? <UilEye /> : <UilEyeSlash />}
                                    </div>
                                </div>
                            )}
                        </div>

                        <span className={confirmPass ? "hidden" : "block w-full rounded-md text-red-500 text-sm self-start mt-[-1rem] mr-1"} >
                            * Password and Confirm Password are not same
                        </span>

                        <button className='w-full py-4 button' type='submit' disabled={loading}>{loading? "Loading . . ." : isSignUp ? "Sign Up" : "Log In"}</button>

                        <span className='text-center'>{isSignUp ? "Already have an account? " : "Don't have an account? "}
                            <span onClick={() => (setIsSignUp((prev) => !prev), resetForm())} className='text-[#ff5851] hover:text-[#ff5751c4] cursor-pointer'>{isSignUp ? "Log In" : "Sign Up"}
                            </span>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Auth