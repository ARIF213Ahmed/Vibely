// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { UserData } from '../context/UserContext';
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from 'react-icons/fa6';
// import { CiEdit } from "react-icons/ci";
// import Modal from '../components/Modal';
// import { Loading } from "../components/Loading";
// import axios from 'axios';
// import toast from "react-hot-toast";

// const Account = ({ user }) => {
//     const navigate = useNavigate();
//     const { logoutUser, updateProfilePic, updateProfileName } = UserData();

//     const { posts, reels, loading } = PostData();

//     let myPosts;

//     if (posts) {
//         myPosts = posts.filter((post) => post.owner._id === user._id);
//     }
//     let myReels;

//     if (reels) {
//         myReels = reels.filter((reel) => reel.owner._id === user._id);
//     }

//     const [type, setType] = useState("post");

//     const logoutHandler = () => {
//         logoutUser(navigate);
//     };

//     const [index, setIndex] = useState(0);

//     const prevReel = () => {
//         if (index === 0) {
//             console.log("null");
//             return null;
//         }
//         setIndex(index - 1);
//     };
//     const nextReel = () => {
//         if (index === myReels.length - 1) {
//             console.log("null");
//             return null;
//         }
//         setIndex(index + 1);
//     };

//     const [show, setShow] = useState(false);
//     const [show1, setShow1] = useState(false);

//     const [followersData, setFollowersData] = useState([]);
//     const [followingsData, setFollowingsData] = useState([]);

//     async function followData() {
//         try {
//             const { data } = await axios.get("/api/user/followdata/" + user._id);
//             // console.log(data);
//             setFollowersData(data.followers);
//             setFollowingsData(data.followings);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const [file, setFile] = useState("");

//     const changeFileHandler = (e) => {
//         const file = e.target.files[0];
//         setFile(file);
//     };

//     const changleImageHandler = () => {
//         const formdata = new FormData();

//         formdata.append("file", file);

//         updateProfilePic(user._id, formdata, setFile);
//     };

//     useEffect(() => {
//         followData();
//     }, [user]);

//     const [showInput, setShowInput] = useState(false);
//     const [name, setName] = useState(user.name ? user.name : "");


//     const UpdateName = () => {
//         updateProfileName(user._id, name, setShowInput);
//     };

//     const [showUpdatePass, setShowUpdatePass] = useState(false);
//     const [oldPassword, setOldPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");

//     async function updatePassword(e) {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("/api/user/" + user._id, {
//                 oldPassword,
//                 newPassword,
//             });

//             toast.success(data.message);
//             setOldPassword("");
//             setNewPassword("");
//             setShowUpdatePass(false);
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     return (
//         <>
//             {user && (
//                 <>
//                     {
//                         loading ? (<Loading />) : (
//                             <div className="bg-[#242424] min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//                                 {
//                                     show && <Modal value={followersData} title={"Followers"} setShow={setShow} />
//                                 }
//                                 {
//                                     show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />
//                                 }
//                                 <div className="bg-white flex justify-between gap-4 p-5 rounded-lg shadow-md max-w-md">
//                                     <div className="image flex flex-col justify-between mb-4 gap-4">
//                                         <img src={user.profilePic.url} alt="" className="w-[180px] h-[180px] rounded-full object-cover" />
//                                         <div className="update w-[150px] flex flex-col justify-center items-center">
//                                             <input
//                                                 type="file"
//                                                 onChange={changeFileHandler}
//                                                 required
//                                                 className='text-black ml-44 mb-2'
//                                             />

//                                             <button
//                                                 className="bg-blue-500 text-white px-3 py-2 rounded-md"
//                                                 onClick={changleImageHandler}
//                                             >
//                                                 Update Profile
//                                             </button>
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col gap-2">
//                                         {
//                                             showInput ? (<>
//                                                 <div className="flex justify-center items-center gap-2">
//                                                     <input
//                                                         className="custom-input1"
//                                                         style={{ width: "100px" }}
//                                                         value={name}
//                                                         onChange={(e) => setName(e.target.value)}
//                                                         placeholder="Enter Name"
//                                                         required
//                                                     />

//                                                     <button onClick={UpdateName} className=' bg-blue-500 text-white p-1 text-sm  rounded-md'>Update</button>
//                                                     <button
//                                                         onClick={() => setShowInput(false)}
//                                                         className="bg-red-400 text-white px-3 py-1 rounded-full text-sm "
//                                                     >
//                                                         X
//                                                     </button>
//                                                 </div>
//                                             </>) : (<p className="text-gray-800 font-semibold">
//                                                 {user.name}
//                                                 <button onClick={() => setShowInput(true)}>
//                                                     <CiEdit />

//                                                 </button>
//                                             </p>)
//                                         }
//                                         <p className="text-gray-500 text-sm ">
//                                             {user.email}
//                                         </p>
//                                         <p className="text-gray-500 text-sm">
//                                             {user.gender}
//                                         </p>
//                                         <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setShow(true)}>
//                                             {user.followers.length} followers
//                                         </p>
//                                         <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setShow1(true)}>
//                                             {user.followings.length} following
//                                         </p>
//                                         <button onClick={logoutHandler} className=" bg-[#3B81F6] text-white rounded-md">Logout</button>
//                                     </div>


//                                 </div>

//                                 <button onClick={() => setShowUpdatePass(!showUpdatePass)} className=" bg-red-500 text-white rounded-md py-1 px-3">{showUpdatePass ? "X" : "Update Password"}</button>
//                                 {
//                                     showUpdatePass && (<form onSubmit={updatePassword} className="flex justify-center items-center flex-col  p-2 rounded-sm gap-4">
//                                         <input
//                                             type="password"
//                                             className="custom-input1"
//                                             placeholder="Old Password"
//                                             value={oldPassword}
//                                             onChange={(e) => setOldPassword(e.target.value)}
//                                             required
//                                         />
//                                         <input
//                                             type="password"
//                                             className="custom-input1"
//                                             placeholder="new Password"
//                                             value={newPassword}
//                                             onChange={(e) => setNewPassword(e.target.value)}
//                                             required
//                                         />
//                                         <button
//                                             type="submit"
//                                             className="bg-blue-500 px-2 py-1 rounded-sm text-white"
//                                         >
//                                             Update Password
//                                         </button>
//                                     </form>)
//                                 }

//                                 <div className="controls flex justify-center items-center bg-[#242424] p-4 rounded-md gap-7">
//                                     <button onClick={() => setType("post")}>Posts</button>
//                                     <button onClick={() => setType("reel")}>Reels</button>
//                                 </div>
//                                 <div className="border-b-2 border-white w-[35%]"></div>

//                                 {type === "post" && (
//                                     <>
//                                         {myPosts && myPosts.length > 0 ? (
//                                             myPosts.map((e) => (
//                                                 <PostCard type={"post"} value={e} key={e._id} />
//                                             ))
//                                         ) : (
//                                             <p>No Post Yet</p>
//                                         )}
//                                     </>
//                                 )}

//                                 {type === "reel" && (

//                                     <>
//                                         {myReels && myReels.length > 0 ? (
//                                             <div className='flex gap-3 justify-center items-center'> <PostCard type={"reel"} value={myReels[index]} key={myReels[index]._id} />

//                                                 <div className="button flex flex-col justify-center items-center gap-6  ">
//                                                     {index === 0 ? "" : (<button className="bg-gray-500 text-white py-5 px-5 rounded-full" onClick={prevReel}>
//                                                         <FaArrowUp />
//                                                     </button>)}
//                                                     {index === myReels.length - 1 ? "" : (< button className="bg-gray-500 text-white py-5 px-5 rounded-full" onClick={nextReel}>
//                                                         <FaArrowDownLong />
//                                                     </button>)}
//                                                 </div>

//                                             </div>
//                                         ) : (
//                                             <p>No Reels Yet</p>
//                                         )}
//                                     </>

//                                 )}


//                             </div>
//                         )
//                     }


//                 </>


//             )}
//         </>
//     )
// }

// export default Account


import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp, FaCamera } from 'react-icons/fa6';
import { CiEdit } from "react-icons/ci";
import Modal from '../components/Modal';
import { Loading } from "../components/Loading";
import axios from 'axios';
import toast from "react-hot-toast";

const Account = ({ user }) => {
    const navigate = useNavigate();
    const { logoutUser, updateProfilePic, updateProfileName } = UserData();
    const { posts, reels, loading } = PostData();
    const fileInputRef = useRef(null);

    let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
    let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

    const [type, setType] = useState("post");
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [followersData, setFollowersData] = useState([]);
    const [followingsData, setFollowingsData] = useState([]);
    const [file, setFile] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState(user.name || "");
    const [showUpdatePass, setShowUpdatePass] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const logoutHandler = () => logoutUser(navigate);

    const nextReel = () => {
        if (index < myReels.length - 1) {
            setIndex(index + 1);
        }
    };

    const prevReel = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const isFirstReel = index === 0;
    const isLastReel = index === myReels.length - 1;
    const isMiddleReel = !isFirstReel && !isLastReel;

    async function followData() {
        try {
            const { data } = await axios.get("/api/user/followdata/" + user._id);
            setFollowersData(data.followers);
            setFollowingsData(data.followings);
        } catch (error) {
            console.log(error);
        }
    }

    const handleProfileClick = () => {
        fileInputRef.current.click();
    };

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            changleImageHandler(file);
        }
    };

    const changleImageHandler = (file) => {
        const formdata = new FormData();
        formdata.append("file", file);
        updateProfilePic(user._id, formdata);
        setFile(null);
    };

    const UpdateName = () => {
        if (name.trim() !== user.name) {
            updateProfileName(user._id, name, setShowInput);
        } else {
            setShowInput(false);
        }
    };

    async function updatePassword(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/user/" + user._id, {
                oldPassword,
                newPassword,
            });
            toast.success(data.message);
            setOldPassword("");
            setNewPassword("");
            setShowUpdatePass(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating password");
        }
    }

    useEffect(() => {
        followData();
    }, [user]);

    return (
        <div className="bg-[#242424] min-h-screen text-white">
            {user && (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="container mx-auto px-4 py-8 max-w-4xl">
                            {/* Profile Section */}
                            <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg mb-6">
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {/* Profile Picture */}
                                    <div className="relative group cursor-pointer" onClick={handleProfileClick}>
                                        <img
                                            src={user.profilePic.url}
                                            alt="Profile"
                                            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <FaCamera className="text-2xl text-white" />
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={changeFileHandler}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex-1">
                                        <div className="mb-4">
                                            {showInput ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        className="bg-gray-700 text-white px-3 py-2 rounded-md w-full max-w-xs"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        placeholder="Enter Name"
                                                        required
                                                        autoFocus
                                                    />
                                                    <button
                                                        onClick={UpdateName}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => setShowInput(false)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="text-2xl font-bold">{user.name}</h2>
                                                        <button
                                                            onClick={() => setShowInput(true)}
                                                            className="text-blue-400 hover:text-blue-300"
                                                        >
                                                            <CiEdit size={20} />
                                                        </button>
                                                    </div>
                                                    {user.gender && (
                                                        <p className="text-gray-400 text-sm capitalize">
                                                            {user.gender}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Follower/Following Section */}
                                        <div className="flex gap-4 mb-4">
                                            <div
                                                className="cursor-pointer hover:text-blue-400 transition"
                                                onClick={() => setShow(true)}
                                            >
                                                <span className="font-semibold">{user.followers.length}</span> followers
                                            </div>
                                            <div
                                                className="cursor-pointer hover:text-blue-400 transition"
                                                onClick={() => setShow1(true)}
                                            >
                                                <span className="font-semibold">{user.followings.length}</span> following
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3">
                                            <button
                                                onClick={logoutHandler}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                                            >
                                                Logout
                                            </button>
                                            <button
                                                onClick={() => setShowUpdatePass(!showUpdatePass)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                            >
                                                {showUpdatePass ? "Cancel" : "Change Password"}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Password Update Form */}
                                {showUpdatePass && (
                                    <form onSubmit={updatePassword} className="mt-6 bg-gray-700 p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <input
                                                    type="password"
                                                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                                                    placeholder="Current Password"
                                                    value={oldPassword}
                                                    onChange={(e) => setOldPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-md"
                                                    placeholder="New Password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                                        >
                                            Update Password
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Centered Post/Reels Tabs */}
                            <div className="flex justify-center border-b border-gray-700 mb-6">
                                <div className="flex">
                                    <button
                                        onClick={() => setType("post")}
                                        className={`px-6 py-2 font-medium ${type === "post" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                                    >
                                        Posts
                                    </button>
                                    <button
                                        onClick={() => setType("reel")}
                                        className={`px-6 py-2 font-medium ${type === "reel" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                                    >
                                        Reels
                                    </button>
                                </div>
                            </div>

                            {/* Content Display */}
                            {type === "post" && (
                                <div className="grid grid-cols-1 gap-6">
                                    {myPosts.length > 0 ? (
                                        myPosts.map((post) => (
                                            <PostCard type={"post"} value={post} key={post._id} />
                                        ))
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-gray-400 text-lg">No Posts Yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {type === "reel" && (
                                <div className="flex justify-center">
                                    {myReels.length > 0 ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-full max-w-md">
                                                <PostCard type={"reel"} value={myReels[index]} key={myReels[index]._id} />
                                            </div>
                                            {/* Navigation Arrows */}
                                            <div className="flex flex-col gap-4">
                                                {isFirstReel && (
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
                                                        onClick={nextReel}
                                                    >
                                                        <FaArrowDownLong size={20} />
                                                    </button>
                                                )}
                                                {isMiddleReel && (
                                                    <>
                                                        <button
                                                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
                                                            onClick={prevReel}
                                                        >
                                                            <FaArrowUp size={20} />
                                                        </button>
                                                        <button
                                                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
                                                            onClick={nextReel}
                                                        >
                                                            <FaArrowDownLong size={20} />
                                                        </button>
                                                    </>
                                                )}
                                                {isLastReel && (
                                                    <button
                                                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
                                                        onClick={prevReel}
                                                    >
                                                        <FaArrowUp size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-gray-400 text-lg">No Reels Yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Modals */}
                            {show && <Modal value={followersData} title={"Followers"} setShow={setShow} />}
                            {show1 && <Modal value={followingsData} title={"Following"} setShow={setShow1} />}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Account;
