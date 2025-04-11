// import React, { useState } from 'react';
// import { PostData } from "../context/PostContext";
// import { LoadingAnimation } from './Loading';

// const AddPost = ({ type }) => {
//     const [caption, setCaption] = useState("");
//     const [file, setFile] = useState("");
//     const [filePrev, setFilePrev] = useState("");

//     const { addPost, addLoading } = PostData();

//     const changeFileHandler = (e) => {
//         const file = e.target.files[0];
//         const reader = new FileReader();

//         reader.readAsDataURL(file);

//         reader.onloadend = () => {
//             setFilePrev(reader.result);
//             setFile(file);
//         };
//     };

//     const submitHandler = (e) => {
//         e.preventDefault();
//         const formdata = new FormData();

//         formdata.append("caption", caption);
//         formdata.append("file", file);
//         addPost(formdata, setFile, setCaption, setFilePrev, type);
//     };

//     return (
//         <div className="bg-[#242424] flex items-center justify-center px-5">

//             <div className="bg-[#242424] border-2 border-[#01f83b87] p-2 rounded-lg shadow-md max-w-md mt-1">

//                 <form onSubmit={submitHandler} className="flex flex-col gap-4 items-center justify-between mb-2 ">
//                     <input
//                         type="text"
//                         className="bg-black rounded-lg px-4 py-2 focus:border focus:outline-none  placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px] border-[#01F83C]"
//                         placeholder="Enter Caption"
//                         value={caption}
//                         onChange={(e) => setCaption(e.target.value)}
//                     />
//                     <input
//                         type="file"
//                         className="custom-input"
//                         accept={type === "post" ? "image/*" : "video/*"}
//                         onChange={changeFileHandler}
//                         required
//                     />
//                     {filePrev && (
//                         <>
//                             {type === "post" ? (
//                                 <img src={filePrev} alt="" />
//                             ) : (
//                                 <video
//                                     controlsList="nodownload"
//                                     controls
//                                     src={filePrev}
//                                     className="h-[450px] w-[300px]"
//                                 />
//                             )}
//                         </>
//                     )}
//                     <button disabled={addLoading} className='bg-blue-500 text-white px-4 py-2 rounded-md'>{addLoading ? <LoadingAnimation /> : "+ Add Post"}</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddPost




import React, { useState } from 'react';
import { PostData } from "../context/PostContext";
import { LoadingAnimation } from './Loading';
import { FiPlus } from 'react-icons/fi';

const AddPost = ({ type }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState("");
    const [filePrev, setFilePrev] = useState("");

    const { addPost, addLoading } = PostData();

    const changeFileHandler = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setFilePrev(reader.result);
            setFile(file);
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append("caption", caption);
        formdata.append("file", file);
        addPost(formdata, setFile, setCaption, setFilePrev, type);
        setIsOpen(false);
    };

    return (
        <>
            {/* Floating Add Button */}
            {/* <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-6 bg-gradient-to-br from-[#01F83C] to-blue-500 text-white p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-all transform hover:scale-105"
            >
                <FiPlus className="text-xl" />
            </button> */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed md:bottom-8 md:right-6 bottom-20 right-6 bg-gradient-to-br from-[#01F83C] to-blue-500 text-white p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-all transform hover:scale-105"
            >
                <FiPlus className="text-xl" />
            </button>

            {/* Popup Form - Fixed size with scrolling */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] border border-gray-200 overflow-hidden flex flex-col">
                        <div className="bg-gradient-to-r from-[#01F83C] to-blue-500 h-2 w-full"></div>
                        <div className="p-6 overflow-y-auto flex-grow">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New {type === "post" ? "Post" : "Reel"}</h2>

                            <form onSubmit={submitHandler} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    className="text-black bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#01F83C] placeholder:text-gray-400 font-medium w-full border border-gray-300"
                                    placeholder="What's on your mind?"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                />

                                <label className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-xl p-6 cursor-pointer hover:border-[#01F83C] transition-colors group">
                                    <div className="text-center">
                                        <div className="mx-auto h-12 w-12 bg-gradient-to-br from-[#01F83C]/20 to-blue-500/20 rounded-full flex items-center justify-center mb-3 group-hover:from-[#01F83C]/30 group-hover:to-blue-500/30">
                                            <FiPlus className="text-[#01F83C] text-xl" />
                                        </div>
                                        <span className="text-gray-600 group-hover:text-gray-800">Click to upload {type === "post" ? "image" : "video"}</span>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept={type === "post" ? "image/*" : "video/*"}
                                        onChange={changeFileHandler}
                                        required
                                    />
                                </label>

                                {filePrev && (
                                    <div className="flex justify-center rounded-lg overflow-hidden border border-gray-200 max-h-[300px]">
                                        {type === "post" ? (
                                            <img
                                                src={filePrev}
                                                alt=""
                                                className="w-full object-contain max-h-[300px]"
                                            />
                                        ) : (
                                            <video
                                                controlsList="nodownload"
                                                controls
                                                src={filePrev}
                                                className="w-full object-contain max-h-[300px]"
                                            />
                                        )}
                                    </div>
                                )}

                                <div className="flex gap-3 mt-4 pt-2 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addLoading}
                                        className="flex-1 bg-gradient-to-r from-[#01F83C] to-blue-500 hover:from-[#01F83C]/90 hover:to-blue-500/90 text-white font-medium py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-80"
                                    >
                                        {addLoading ? <LoadingAnimation /> : "Post Now"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPost;