// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { PostData } from "../context/PostContext";
// import PostCard from "../components/PostCard";
// import { FaArrowDownLong, FaArrowUp } from 'react-icons/fa6';
// import axios from 'axios';
// import { Loading } from '../components/Loading';
// import { UserData } from '../context/UserContext';
// import Modal from '../components/Modal';

// const UserAccount = ({ user: loggedInUser }) => {
//     const navigate = useNavigate();


//     const { posts, reels } = PostData();
//     const [user, setUser] = useState([]);

//     const params = useParams();

//     const [loading, setLoading] = useState(true);

//     async function fetchUser() {
//         try {
//             const { data } = await axios.get("/api/user/" + params.id);

//             setUser(data);
//             setLoading(false);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }


//     useEffect(() => {
//         fetchUser();
//     }, [params.id]);




//     let myPosts;

//     if (posts) {
//         myPosts = posts.filter((post) => post.owner._id === user._id);
//     }
//     let myReels;

//     if (reels) {
//         myReels = reels.filter((reel) => reel.owner._id === user._id);
//     }

//     const [type, setType] = useState("post");


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

//     const [followed, setFollowed] = useState(false);

//     const { followUser } = UserData();

//     const followHandler = () => {
//         setFollowed(!followed);
//         followUser(user._id, fetchUser);
//         // followUser(user._id);

//     };

//     const followers = user.followers;

//     useEffect(() => {
//         if (followers && followers.includes(loggedInUser._id)) setFollowed(true);
//     }, [user]);

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

//     useEffect(() => {
//         followData();
//     }, [user]);

//     return (
//         <>
//             {
//                 loading ? (<Loading />) : (
//                     <>
//                         {user && (
//                             <>
//                                 <div className="bg-[#242424] min-h-screen flex flex-col gap-4 items-center justify-center pt-3 pb-14">
//                                     {
//                                         show && <Modal value={followersData} title={"Followers"} setShow={setShow} />
//                                     }
//                                     {
//                                         show1 && <Modal value={followingsData} title={"Followings"} setShow={setShow1} />
//                                     }
//                                     <div className="bg-white flex justify-between gap-4 p-5 rounded-lg shadow-md max-w-md">
//                                         <div className="image flex flex-col justify-between mb-4 gap-4">
//                                             <img src={user.profilePic.url} alt="" className="w-[180px] h-[180px] rounded-full object-cover" />
//                                         </div>
//                                         <div className="flex flex-col gap-2">
//                                             <p className="text-gray-800 font-semibold">
//                                                 {user.name}
//                                             </p>
//                                             <p className="text-gray-500 text-sm ">
//                                                 {user.email}
//                                             </p>
//                                             <p className="text-gray-500 text-sm">
//                                                 {user.gender}
//                                             </p>
//                                             <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setShow(true)}>
//                                                 {user.followers.length} followers
//                                             </p>
//                                             <p className="text-gray-500 text-sm cursor-pointer" onClick={() => setShow1(true)} >
//                                                 {user.followings.length} following
//                                             </p>

//                                             {
//                                                 user._id === loggedInUser._id ? ("") : (<button
//                                                     onClick={followHandler}
//                                                     className={`py-2 px-5 text-white rounded-md ${followed ? "bg-red-500" : "bg-[#01F83C]"
//                                                         }`}
//                                                 >
//                                                     {followed ? "UnFollow" : "Follow"}
//                                                 </button>)
//                                             }




//                                         </div>
//                                     </div>

//                                     <div className="controls flex justify-center items-center bg-[#242424] p-4 rounded-md gap-7">
//                                         <button onClick={() => setType("post")}>Posts</button>
//                                         <button onClick={() => setType("reel")}>Reels</button>
//                                     </div>
//                                     <div className="border-b-2 border-white w-[35%]"></div>

//                                     {type === "post" && (
//                                         <>
//                                             {myPosts && myPosts.length > 0 ? (
//                                                 myPosts.map((e) => (
//                                                     <PostCard type={"post"} value={e} key={e._id} />
//                                                 ))
//                                             ) : (
//                                                 <p>No Post Yet</p>
//                                             )}
//                                         </>
//                                     )}

//                                     {type === "reel" && (

//                                         <>
//                                             {myReels && myReels.length > 0 ? (
//                                                 <div className='flex gap-3 justify-center items-center'> <PostCard type={"reel"} value={myReels[index]} key={myReels[index]._id} />

//                                                     <div className="button flex flex-col justify-center items-center gap-6  ">
//                                                         {index === 0 ? "" : (<button className="bg-gray-500 text-white py-5 px-5 rounded-full" onClick={prevReel}>
//                                                             <FaArrowUp />
//                                                         </button>)}
//                                                         {index === myReels.length - 1 ? "" : (< button className="bg-gray-500 text-white py-5 px-5 rounded-full" onClick={nextReel}>
//                                                             <FaArrowDownLong />
//                                                         </button>)}
//                                                     </div>

//                                                 </div>
//                                             ) : (
//                                                 <p>No Reels Yet</p>
//                                             )}
//                                         </>

//                                     )}


//                                 </div>


//                             </>


//                         )}

//                     </>
//                 )
//             }
//         </>
//     )
// }

// export default UserAccount



import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from 'react-icons/fa6';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { UserData } from '../context/UserContext';
import Modal from '../components/Modal';

const UserAccount = ({ user: loggedInUser }) => {
    const navigate = useNavigate();
    const { posts, reels } = PostData();
    const { followUser } = UserData();
    const [user, setUser] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState("post");
    const [index, setIndex] = useState(0);
    const [followed, setFollowed] = useState(false);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [followersData, setFollowersData] = useState([]);
    const [followingsData, setFollowingsData] = useState([]);

    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/" + params.id);
            setUser(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function followData() {
        try {
            const { data } = await axios.get("/api/user/followdata/" + user._id);
            setFollowersData(data.followers);
            setFollowingsData(data.followings);
        } catch (error) {
            console.log(error);
        }
    }

    const prevReel = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const nextReel = () => {
        if (index < myReels.length - 1) {
            setIndex(index + 1);
        }
    };

    const followHandler = () => {
        setFollowed(!followed);
        followUser(user._id, fetchUser);
    };

    useEffect(() => {
        fetchUser();
    }, [params.id]);

    useEffect(() => {
        if (user.followers && user.followers.includes(loggedInUser._id)) {
            setFollowed(true);
        }
    }, [user]);

    useEffect(() => {
        if (user._id) {
            followData();
        }
    }, [user]);

    let myPosts = posts ? posts.filter((post) => post.owner._id === user._id) : [];
    let myReels = reels ? reels.filter((reel) => reel.owner._id === user._id) : [];

    // Navigation arrow conditions
    const isFirstReel = index === 0;
    const isLastReel = index === myReels.length - 1;
    const isMiddleReel = !isFirstReel && !isLastReel;

    return (
        <div className="bg-[#242424] min-h-screen text-white">
            {loading ? (
                <Loading />
            ) : user && (
                <div className="container mx-auto px-4 py-8 max-w-4xl">
                    {/* Profile Section */}
                    <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg mb-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Profile Picture */}
                            <div className="relative">
                                <img
                                    src={user.profilePic.url}
                                    alt=""
                                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    {user.gender && (
                                        <p className="text-gray-400 text-sm capitalize">
                                            {user.gender}
                                        </p>
                                    )}
                                </div>

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

                                {user._id !== loggedInUser._id && (
                                    <button
                                        onClick={followHandler}
                                        className={`py-2 px-5 text-white rounded-md ${followed ? "bg-red-500" : "bg-green-500"}`}
                                    >
                                        {followed ? "Unfollow" : "Follow"}
                                    </button>
                                )}
                            </div>
                        </div>
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
        </div>
    )
}

export default UserAccount;
