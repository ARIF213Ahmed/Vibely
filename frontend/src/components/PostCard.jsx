// import React, { useEffect, useState } from 'react';
// import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
// import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
// import { UserData } from "../context/UserContext";
// import { Link } from "react-router-dom";
// import { PostData } from "../context/PostContext";
// import { format } from "date-fns";
// import { MdDelete } from "react-icons/md";
// import SimpleModal from './SimpleModal';
// import { LoadingAnimation } from './Loading';
// import toast from "react-hot-toast";
// import axios from "axios";

// const PostCard = ({ type, value }) => {
//     const [isLike, setIsLike] = useState(false);
//     const [show, setShow] = useState(false);
//     const { user } = UserData();
//     const { likePost, addComment, deletePost, loading, fetchPosts } = PostData();

//     const formatDate = format(new Date(value.createdAt), "MMMM do");


//     useEffect(() => {
//         for (let i = 0; i < value.likes.length; i++) {
//             if (value.likes[i] === user._id) setIsLike(true);
//         }
//     }, [value, user._id]);

//     const likeHandler = () => {
//         setIsLike(!isLike);

//         likePost(value._id);
//     };

//     const [comment, setComment] = useState("");

//     const addCommentHandler = (e) => {
//         e.preventDefault();
//         addComment(value._id, comment, setComment, setShow);
//     };

//     const [showModal, setShowModal] = useState(false);

//     const closeModal = () => {
//         setShowModal(false);
//     };

//     const deleteHandler = () => {
//         deletePost(value._id);
//     };

//     const [showInput, setShowInput] = useState(false);

//     const editHandler = () => {
//         setShowModal(false);
//         setShowInput(true);
//     };

//     const [caption, setCaption] = useState(value.caption ? value.caption : "");
//     const [captionLoading, setCaptionLoading] = useState(false);

//     async function updateCaption() {
//         setCaptionLoading(true);
//         try {
//             const { data } = await axios.put("/api/post/" + value._id, { caption });

//             toast.success(data.message);
//             fetchPosts();
//             setShowInput(false);
//             setCaptionLoading(false);
//         } catch (error) {
//             toast.error(error.response.data.message);
//             setCaptionLoading(false);
//         }
//     }

//     return (
//         <div className=' flex bg-[#242424] items-center justify-center pt-3 pb-14  '>
//             <SimpleModal isOpen={showModal} onClose={closeModal}>
//                 <div className="flex flex-col items-center justify-center gap-3">
//                     <button
//                         onClick={editHandler}
//                         className="bg-[#3B81F6] text-white py-1 px-3 rounded-md"
//                     >
//                         Edit
//                     </button>
//                     <button
//                         onClick={deleteHandler}
//                         className="bg-red-400 text-white py-1 px-3 rounded-md"
//                         disabled={loading}
//                     >
//                         {loading ? <LoadingAnimation /> : "Delete"}

//                     </button>
//                 </div>
//             </SimpleModal>

//             <div className="bg-white p-8 rounded-lg shadow-md max-w-md ">
//                 <div className="flex items-center space-x-2 justify-between">
//                     <Link className="flex items-center space-x-2" to={`/user/${value.owner._id}`}>
//                         <img src={value.owner.profilePic.url} alt="" className="w-8 h-8 rounded-full" />
//                         <div className="">
//                             <p className="text-gray-800 font-semibold">{value.owner.name}</p>
//                             <div className="text-gray-500 text-sm">{formatDate}</div>
//                         </div>
//                     </Link>


//                     {value.owner._id === user._id && (<div className="text-gray-500 cursor-pointer  ">
//                         <button onClick={() => setShowModal(true)} className="hover:bg-gray-50 rounded-full p-1 text-2xl"> <BsThreeDotsVertical /></button>
//                     </div>)}

//                 </div>
//                 <div className="mb-4 ">
//                     {showInput ? (<>
//                         <input
//                             className="custom-input1 mt-2"
//                             style={{ width: "200px" }}
//                             type="text"
//                             placeholder="Enter Caption"
//                             value={caption}
//                             onChange={(e) => setCaption(e.target.value)}
//                             required
//                         />
//                         {/* <button
//                             onClick={updateCaption}
//                             className="text-sm bg-blue-500 text-white px-1 py-1 rounded-md"
//                             disabled={captionLoading}
//                         >
//                             {captionLoading ? <LoadingAnimation /> : "Update Caption"}
//                         </button> */}
//                         <button onClick={updateCaption} className='text-white text-sm bg-[#0181f8] px-2 py-2 rounded-md ml-5' disabled={captionLoading}>{captionLoading ? <LoadingAnimation /> : "Update"}</button>
//                         <button className='text-white text-sm bg-red-400 px-3 py-2 rounded-full ml-2' onClick={() => setShowInput(false)}>X</button>
//                     </>) : (< p className='text-gray-800 text-sm mt-2'>
//                         {value.caption}
//                     </p>)}
//                 </div>

//                 <div className="mb-4 ">
//                     {type === "post" ? (<img src={value.post.url} alt='' className="object-cover rounded-md" />) : (<video src={value.post.url}
//                         alt=""
//                         className="w-[450px] h-[600px] object-cover rounded-md"
//                         autoPlay
//                         controls
//                     />)}
//                 </div>
//                 <div className="flex items-center justify-between text-gray-500 w-[450px] ">
//                     <div className="flex items-center space-x-2">
//                         <span
//                             onClick={likeHandler}
//                             className="text-red-500 text-2xl cursor-pointer"
//                         >
//                             {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
//                         </span>
//                         <button className='hover:bg-gray-50 rounded-full p-1'>{value.likes.length} likes</button>
//                     </div>
//                     <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1" onClick={() => setShow(!show)}>
//                         <BsChatFill />
//                         <span>{value.comments.length} comments</span>
//                     </button>
//                 </div>
//                 {
//                     show && (<form onSubmit={addCommentHandler} className='flex gap-3' >
//                         <input type="text" className='text-black bg-white rounded-lg px-5 py-2 focus:border focus:outline-none  placeholder:text-gray-600 placeholder:opacity-50 font-light md:w-72 lg:w-[340px] '
//                             placeholder='Enter Comment'
//                             value={comment}
//                             onChange={e => setComment(e.target.value)}
//                         />
//                         <button className='bg-[#3B81F6] rounded-lg px-5 py-2" type="submit'>Add</button>
//                     </form>)
//                 }
//                 <hr className="mt-2 mb-2" />
//                 <p className="text-gray-800 font-semibold">Comments</p>
//                 <hr className="mt-2 mb-2" />
//                 <div className="mt-4">
//                     <div className="comments max-h-[200px] overflow-y-auto">
//                         {
//                             value.comments && value.comments.length > 0 ? (value.comments.map((e) => (
//                                 <Comment key={e._id} value={e} user={user} owner={value.owner._id} id={value._id} />
//                             ))) : (<p className='text-sm text-black'>No comments</p>)
//                         }

//                     </div>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default PostCard

// export const Comment = ({ value, user, owner, id }) => {
//     const { deleteComment } = PostData();

//     const deleteCommentHandler = () => {
//         deleteComment(id, value._id);
//     };
//     return (
//         <div className="flex items-center space-x-2 mt-2 justify-between  ">
//             <div className="flex items-center gap-2">
//                 <Link to={`/user/${value.user._id}`}>
//                     <img
//                         src={value.user.profilePic.url}
//                         className="w-8 h-8 rounded-full"
//                         alt=""
//                     />
//                 </Link>
//                 <div>
//                     <p className="text-gray-800 font-semibold text-sm">{value.user.name}</p>
//                     <p className="text-gray-500 text-sm">{value.comment}</p>
//                 </div>
//             </div>

//             {/* {owner === user._id ? (
//                 ""
//             ) : (
//                 <>
//                     {value.user._id === user._id && (
//                         <button onClick={deleteCommentHandler} className="text-red-500">
//                             <MdDelete />
//                         </button>
//                     )}
//                 </>
//             )}

//             {owner === user._id && (
//                 <button onClick={deleteCommentHandler} className="text-red-500">
//                     <MdDelete />
//                 </button>
//             )} */}
//             <div className="">
//                 {
//                     owner === user._id ? ("") : (<>{value.user._id === user._id && <button onClick={deleteCommentHandler} className="text-red-500">
//                         <MdDelete />
//                     </button>}</>)
//                 }
//                 {
//                     owner === user._id && (<button onClick={deleteCommentHandler} className="text-red-500">
//                         <MdDelete />
//                     </button>)
//                 }
//             </div>

//         </div>



//     );
// };





import React, { useEffect, useState } from 'react';
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { UserData } from "../context/UserContext";
import { Link } from "react-router-dom";
import { PostData } from "../context/PostContext";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import SimpleModal from './SimpleModal';
import { LoadingAnimation } from './Loading';
import toast from "react-hot-toast";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const PostCard = ({ type, value }) => {
    const [isLike, setIsLike] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showLikers, setShowLikers] = useState(false);
    const [likers, setLikers] = useState([]);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [reels, setReels] = useState([]);
    const { user } = UserData();
    const { likePost, addComment, deletePost, loading, fetchPosts, reels: allReels } = PostData();

    const formatDate = format(new Date(value.createdAt), "MMMM do");

    useEffect(() => {
        setIsLike(value.likes.includes(user._id));
    }, [value, user._id]);

    useEffect(() => {
        if (type === "reel") {
            setReels(allReels);
            setCurrentReelIndex(allReels.findIndex(reel => reel._id === value._id));
        }
    }, [type, value._id, allReels]);

    const likeHandler = () => {
        setIsLike(!isLike);
        likePost(value._id);
    };

    const [comment, setComment] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [caption, setCaption] = useState(value.caption || "");
    const [captionLoading, setCaptionLoading] = useState(false);

    const fetchLikers = async () => {
        try {
            const { data } = await axios.get(`/api/post/${value._id}/likers`);
            setLikers(data.likers);
        } catch (error) {
            toast.error("Failed to fetch likers");
        }
    };

    const addCommentHandler = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            addComment(value._id, comment, setComment);
        }
    };

    const closeModal = () => setShowModal(false);
    const deleteHandler = () => deletePost(value._id);
    const editHandler = () => {
        setShowModal(false);
        setShowInput(true);
    };

    const toggleLikers = async () => {
        if (!showLikers) {
            await fetchLikers();
        }
        setShowLikers(!showLikers);
    };

    const nextReel = () => {
        if (currentReelIndex < reels.length - 1) {
            setCurrentReelIndex(currentReelIndex + 1);
        }
    };

    const prevReel = () => {
        if (currentReelIndex > 0) {
            setCurrentReelIndex(currentReelIndex - 1);
        }
    };

    async function updateCaption() {
        setCaptionLoading(true);
        try {
            const { data } = await axios.put("/api/post/" + value._id, { caption });
            toast.success(data.message);
            fetchPosts();
            setShowInput(false);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setCaptionLoading(false);
        }
    }

    // Navigation arrow conditions
    const isFirstReel = currentReelIndex === 0;
    const isLastReel = currentReelIndex === reels.length - 1;
    const showUpArrow = !isFirstReel;
    const showDownArrow = !isLastReel;

    return (
        <div className="min-h-screen flex items-center justify-center py-8 ">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md relative">
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <Link to={`/user/${value.owner._id}`} className="flex items-center space-x-3">
                        <img
                            src={value.owner.profilePic.url}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <p className="font-semibold text-gray-800">{value.owner.name}</p>
                            <p className="text-xs text-gray-500">{formatDate}</p>
                        </div>
                    </Link>

                    {value.owner._id === user._id && (
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                            <BsThreeDotsVertical size={20} />
                        </button>
                    )}
                </div>

                {/* Post Caption (Editable) */}
                <div className="p-4">
                    {showInput ? (
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                className="text-black flex-1 border border-gray-300 rounded-lg px-3 py-2 outline-none"
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                placeholder="Edit caption"
                            />
                            <button
                                onClick={updateCaption}
                                className="bg-blue-500 text-white px-3 py-2 rounded-lg disabled:opacity-50"
                                disabled={captionLoading}
                            >
                                {captionLoading ? <LoadingAnimation size={20} /> : "Save"}
                            </button>
                            <button
                                onClick={() => setShowInput(false)}
                                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-800 mb-4">{value.caption}</p>
                    )}
                </div>

                {/* Post Media */}
                <div className="w-full flex justify-center relative">
                    {type === "post" ? (
                        <img
                            src={value.post.url}
                            alt="Post"
                            className="w-full object-cover max-h-[600px]"
                        />
                    ) : (
                        <div className="relative w-full">
                            <video
                                src={value.post.url}
                                // controls
                                className="w-full aspect-[9/16] object-cover"
                                playsInline
                                autoPlay
                            />
                            {/* Navigation Arrows for Reels */}
                            {/* <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4 mr-2 bg-red-400">
                                {showDownArrow && (
                                    <button 
                                        onClick={nextReel}
                                        className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-md transition-all"
                                    >
                                        <FaArrowDown />
                                    </button>
                                )}
                                {showUpArrow && (
                                    <button 
                                        onClick={prevReel}
                                        className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-md transition-all"
                                    >
                                        <FaArrowUp />
                                    </button>
                                )}
                            </div> */}
                        </div>
                    )}
                </div>

                {/* Post Actions */}
                <div className="p-4 border-t border-b border-gray-200 flex justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={likeHandler}
                            className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
                        >
                            {isLike ? (
                                <IoHeartSharp className="text-red-500 text-2xl" />
                            ) : (
                                <IoHeartOutline className="text-2xl" />
                            )}
                        </button>
                        <button
                            onClick={toggleLikers}
                            className="text-gray-700 hover:text-gray-900"
                        >
                            {value.likes.length} likes
                        </button>
                    </div>

                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-500"
                    >
                        <BsChatFill className="text-xl" />
                        <span>{value.comments.length}</span>
                    </button>
                </div>

                {/* Likers Modal
                {showLikers && (
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-3">Liked by</h3>
                        <div className="space-y-3 max-h-40 overflow-y-auto">
                            {likers.length > 0 ? (
                                likers.map((liker) => (
                                    <Link
                                        key={liker._id}
                                        to={`/user/${liker._id}`}
                                        className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg"
                                    >
                                        <img
                                            src={liker.profilePic.url}
                                            alt={liker.name}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <span className="text-gray-800">{liker.name}</span>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-2">No likes yet</p>
                            )}
                        </div>
                    </div>
                )} */}

                {/* Comment Section (Conditional) */}
                {showComments && (
                    <div className="p-4">
                        {/* Add Comment Form */}
                        <form onSubmit={addCommentHandler} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="text-black flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                            >
                                Post
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-4 max-h-64 overflow-y-auto">
                            {value.comments.length > 0 ? (
                                value.comments.map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        value={comment}
                                        user={user}
                                        owner={value.owner._id}
                                        id={value._id}
                                    />
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-4">No comments yet</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Post Options Modal */}
                <SimpleModal isOpen={showModal} onClose={closeModal}>
                    <div className="flex flex-col space-y-3 p-4">
                        <button
                            onClick={editHandler}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                        >
                            Edit Post
                        </button>
                        <button
                            onClick={deleteHandler}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? <LoadingAnimation size={20} /> : "Delete Post"}
                        </button>
                    </div>
                </SimpleModal>
            </div>
        </div>
    );
};

const Comment = ({ value, user, owner, id }) => {
    const { deleteComment } = PostData();

    const deleteCommentHandler = () => {
        deleteComment(id, value._id);
    };

    return (
        <div className="flex justify-between items-start ">
            <div className="flex items-start space-x-3">
                <Link to={`/user/${value.user._id}`}>
                    <img
                        src={value.user.profilePic.url}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                </Link>
                <div>
                    <Link to={`/user/${value.user._id}`} className="font-semibold text-sm text-gray-800 hover:underline">
                        {value.user.name}
                    </Link>
                    <p className="text-gray-700 text-sm">{value.comment}</p>
                </div>
            </div>

            {(owner === user._id || value.user._id === user._id) && (
                <button
                    onClick={deleteCommentHandler}
                    className="text-gray-400 hover:text-red-500"
                >
                    <MdDelete size={18} />
                </button>
            )}
        </div>
    );
};

export default PostCard;