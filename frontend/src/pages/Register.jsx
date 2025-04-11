// import React, { useState } from 'react'
// import { Link, useNavigate } from "react-router-dom";
// import { UserData } from '../context/UserContext';
// import { PostData } from '../context/PostContext';

// const Register = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [gender, setGender] = useState("");
//     const [file, setFile] = useState("");
//     const [filePrev, setFilePrev] = useState("");

//     const { registerUser, loading } = UserData();

//     const { fetchPosts } = PostData();


//     const changeFileHandler = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.readAsDataURL(file);

//         reader.onloadend = () => {
//             setFilePrev(reader.result);
//             setFile(file);
//         };
//     };

//     const navigate = useNavigate();
//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formdata = new FormData();

//         formdata.append("name", name);
//         formdata.append("email", email);
//         formdata.append("password", password);
//         formdata.append("gender", gender);
//         formdata.append("file", file);

//         registerUser(formdata, navigate, fetchPosts);
//         // console.log(name, email, password, gender, file);
//     };


//     return (
//         <>
//             {
//                 loading ? (<h1>loading...</h1>) : (<div className="flex justify-center ">
//                     <div className='flex flex-col border-[#01F83C] border-2 justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[40px] '>
//                         <div className='w-full md:w-3/4'>
//                             <div className='text-xl cursor-pointer flex flex-col justify-center items-center mt-5 md:mt-0 py-4'>
//                                 <h1 className="font-semibold text-xl md:text-3xl text-white m-2">
//                                     Register to Vibely
//                                 </h1>
//                             </div>

//                             <form onSubmit={submitHandler}>
//                                 <div className='flex flex-col justify-center items-center m-2 space-y-6 md:space-y-8'>
//                                     {filePrev && (
//                                         <img
//                                             src={filePrev}
//                                             className="w-[180px] h-[180px] rounded-full"
//                                             alt=""
//                                         />
//                                     )}

//                                     <input
//                                         type="file"
//                                         className="custom-input w-[80%]"
//                                         onChange={changeFileHandler}
//                                         accept="image/*"
//                                         required
//                                     />
//                                     <input
//                                         type="text"
//                                         className="custom-input"
//                                         placeholder="User Name"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                         required
//                                     />
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

//                                     <select
//                                         className="custom-input"
//                                         value={gender}
//                                         onChange={(e) => setGender(e.target.value)}
//                                         required
//                                     >
//                                         <option value="">Select Gender</option>
//                                         <option value="male">Male</option>
//                                         <option value="female">Female</option>
//                                     </select>
//                                 </div>
//                                 <div className="text-center mt-7 mb-3">
//                                     <button className="auth-btn">Register</button>
//                                 </div>
//                             </form>
//                         </div>

//                         <div className="h-[100%] w-full md:w-1/3 text-[#01F83C] items-center justify-center flex">
//                             <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
//                                 <h1 className="text-xl">Have Account?</h1>
//                                 <h1 className='font-light py-4'>Login to Vibely</h1>
//                                 <Link
//                                     to="/login"
//                                     className="bg-black rounded-2xl px-4 text-[#01F83C] py-1 mt-">
//                                     Login
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>)
//             }
//         </>
//     );
// }

// export default Register


import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserData } from '../context/UserContext';
import { PostData } from '../context/PostContext';
import { FiUser, FiMail, FiLock, FiUpload } from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [file, setFile] = useState(null);
    const [filePrev, setFilePrev] = useState("");
    const [errors, setErrors] = useState({});

    const { registerUser, loading } = UserData();
    const { fetchPosts } = PostData();
    const navigate = useNavigate();

    const changeFileHandler = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePrev(reader.result);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
        if (errors.file) {
            setErrors(prev => ({ ...prev, file: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!name.trim()) newErrors.name = 'Name is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!gender) newErrors.gender = 'Gender is required';
        if (!file) newErrors.file = 'Profile picture is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("password", password);
        formdata.append("gender", gender);
        formdata.append("file", file);
        registerUser(formdata, navigate, fetchPosts);
    };

    const handleBlur = (field) => {
        if (!field) return;

        const newErrors = { ...errors };

        switch (field) {
            case 'name':
                if (!name.trim()) newErrors.name = 'Name is required';
                else delete newErrors.name;
                break;
            case 'email':
                if (!email.trim()) newErrors.email = 'Email is required';
                else delete newErrors.email;
                break;
            case 'password':
                if (!password) newErrors.password = 'Password is required';
                else delete newErrors.password;
                break;
            case 'gender':
                if (!gender) newErrors.gender = 'Gender is required';
                else delete newErrors.gender;
                break;
            case 'file':
                if (!file) newErrors.file = 'Profile picture is required';
                else delete newErrors.file;
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            {loading ? (
                <h1 className="text-white">Loading...</h1>
            ) : (
                <div className="w-full max-w-4xl">
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row">
                        {/* Left Side - Form */}
                        <div className="w-full md:w-2/3 p-8 md:p-12">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-[#01F83C] mb-2">Join Vibely</h1>
                                <p className="text-gray-400">Create your account to get started</p>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6" noValidate>
                                {/* Profile Picture Upload */}
                                <div className="flex flex-col items-center">
                                    <label className="relative cursor-pointer">
                                        {filePrev ? (
                                            <img
                                                src={filePrev}
                                                className="w-32 h-32 rounded-full object-cover border-2 border-[#01F83C] mb-4"
                                                alt="Profile preview"
                                            />
                                        ) : (
                                            <div className={`w-32 h-32 rounded-full bg-gray-700 border-2 border-dashed ${errors.file ? 'border-red-500' : 'border-[#01F83C]'} flex items-center justify-center mb-4`}>
                                                <FiUpload className={`text-2xl ${errors.file ? 'text-red-500' : 'text-[#01F83C]'}`} />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={changeFileHandler}
                                            onBlur={() => handleBlur('file')}
                                            accept="image/*"
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                    <span className={`text-sm ${errors.file ? 'text-red-500' : 'text-gray-400'}`}>
                                        {errors.file || 'Click to upload profile picture'}
                                    </span>
                                </div>

                                {/* Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiUser className={`${errors.name ? 'text-red-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        type="text"
                                        className={`w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#01F83C]'}`}
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            if (errors.name) handleBlur('name');
                                        }}
                                        onBlur={() => handleBlur('name')}
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className={`${errors.email ? 'text-red-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        type="email"
                                        className={`w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#01F83C]'}`}
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (errors.email) handleBlur('email');
                                        }}
                                        onBlur={() => handleBlur('email')}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className={`${errors.password ? 'text-red-500' : 'text-gray-400'}`} />
                                    </div>
                                    <input
                                        type="password"
                                        className={`w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#01F83C]'}`}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) handleBlur('password');
                                        }}
                                        onBlur={() => handleBlur('password')}
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                    )}
                                </div>

                                {/* Gender Select */}
                                <div className="relative">
                                    <select
                                        className={`w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#01F83C]'} appearance-none`}
                                        value={gender}
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                            if (errors.gender) handleBlur('gender');
                                        }}
                                        onBlur={() => handleBlur('gender')}
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className={`w-5 h-5 ${errors.gender ? 'text-red-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    {errors.gender && (
                                        <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                                    )}
                                </div>

                                {/* Register Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-[#01F83C] hover:bg-[#01d634] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Side - Login Prompt */}
                        <div className="w-full md:w-1/3 bg-gradient-to-b from-[#01F83C] to-[#01d634] flex flex-col items-center justify-center p-8 text-center">
                            <div className="text-white space-y-4">
                                <h2 className="text-2xl font-bold">Already Registered?</h2>
                                <p className="text-white/90">Sign in to access your Vibely account</p>
                                <Link
                                    to="/login"
                                    className="inline-block mt-6 bg-black hover:bg-gray-900 text-[#01F83C] font-medium py-2 px-6 rounded-full transition-all duration-200"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;