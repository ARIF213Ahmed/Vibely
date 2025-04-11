// import React, { useState } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from "../context/UserContext";
// import { PostData } from "../context/PostContext";

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const { loginUser, loading } = UserData();

//     const { fetchPosts } = PostData();

//     const submitHandler = (e) => {
//         e.preventDefault();
//         // const formdata = new FormData();
//         // formdata.append("name", name);
//         // formdata.append("email", email);
//         // formdata.append("password", password);
//         // formdata.append("gender", gender);
//         // formdata.append("file", file);
//         loginUser(email, password, navigate, fetchPosts);

//         // registerUser(formdata, navigate, fetchPosts);
//         console.log(email, password);
//     };

//     return (
//         <>
//             {
//                 loading ? (<h1>loading...</h1>) : (<div className=" flex justify-center items-center mt-10">
//                     <div className='border-2 flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[40px]' style={{ borderColor: "#01F83C" }} >
//                         <div className='w-full md:w-3/4'>
//                             <div className='text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4'>
//                                 <h1 className="font-semibold text-xl md:text-3xl text-white m-2">
//                                     Login to Vibely
//                                 </h1>
//                             </div>

//                             <form onSubmit={submitHandler}>
//                                 <div className='flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8'>
//                                     <input
//                                         type="email"
//                                         className="custom-input"
//                                         placeholder="User Email"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                     <input
//                                         type="password"
//                                         className="custom-input"
//                                         placeholder="User Password"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />


//                                 </div>
//                                 <div className="text-center mt-7 mb-5">
//                                     <button className="auth-btn">Login</button>
//                                 </div>
//                             </form>
//                         </div>

//                         <div className="h-[100%] w-full md:w-1/3  items-center justify-center flex">
//                             <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
//                                 <h1 className="text-xl">Don't Have Account?</h1>
//                                 <h1 className='font-light py-4 '>Register to Vibely</h1>
//                                 <Link
//                                     to="/register"
//                                     className="bg-black rounded-2xl px-4 text-[#01F83C] py-1 ">
//                                     Register
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div >)
//             }
//         </>
//     )
// }

// export default Login

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Loading } from '../components/Loading';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { loginUser, loading } = UserData();
    const { fetchPosts } = PostData();

    const submitHandler = (e) => {
        e.preventDefault();
        loginUser(email, password, navigate, fetchPosts);
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            {loading ? (
                <Loading />
            ) : (
                <div className="w-full max-w-4xl">
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                        {/* Left Side - Form */}
                        <div className="w-full md:w-2/3 p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-[#01F83C] mb-2">Welcome Back</h1>
                                <p className="text-gray-400">Login to your Vibely account</p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01F83C]"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01F83C]"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-[#01F83C] hover:bg-[#01d634] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <FiLogIn />
                                        <span>Login</span>
                                    </button>
                                </div>
                            </form>

                            <div className="text-center mt-6">
                                <Link
                                    to="/forgot-password"
                                    className="text-gray-400 hover:text-[#01F83C] text-sm transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Register Prompt */}
                        <div className="w-full md:w-1/3 bg-gradient-to-b from-[#01F83C] to-[#01d634] flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-white space-y-4">
                                <h2 className="text-2xl font-bold">New Here?</h2>
                                <p className="text-white/90">Sign up and discover all the features Vibely has to offer!</p>
                                <Link
                                    to="/register"
                                    className="inline-block mt-6 bg-black hover:bg-gray-900 text-[#01F83C] font-medium py-2 px-6 rounded-full transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;