// import React from "react";
// import { Link } from "react-router-dom";

// const Modal = ({ value, title, setShow }) => {
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
//             <div className="bg-white rounded-lg p-4 shadow-lg w-[300px] max-h-[300px] overflow-y-auto">
//                 <h1 className="text-2xl text-[#3B81F6]">{title}</h1>
//                 <div className="flex justify-end relative">
//                     <button
//                         onClick={() => setShow(false)}
//                         className="text-gray-500 text-2xl absolute -top-10"
//                     >
//                         &times;
//                     </button>
//                 </div>
//                 <div className="flex flex-col space-y-2 mt-2 ">
//                     {value && value.length > 0 ? (
//                         value.map((e, i) => (
//                             <Link
//                                 className="bg-gray-400 py-2 px-3 text-white text-center mt-2 rounded-md flex justify-start items-center gap-4"
//                                 to={`/user/${e._id}`}
//                                 key={i}
//                                 onClick={() => setShow(false)}
//                             >
//                                 {i + 1}{" "}
//                                 <img
//                                     className="w-8 h-8 rounded-full"
//                                     src={e.profilePic.url}
//                                     alt=""
//                                 />
//                                 {e.name}
//                             </Link>
//                         ))
//                     ) : (
//                         <p className="text-black text-sm">No {title} yet</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;


import React from "react";
import { Link } from "react-router-dom";

const Modal = ({ value, title, setShow }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button
                        onClick={() => setShow(false)}
                        className="text-gray-400 hover:text-white text-2xl transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 space-y-3">
                    {value && value.length > 0 ? (
                        value.map((user) => (
                            <Link
                                to={`/user/${user._id}`}
                                key={user._id}
                                onClick={() => setShow(false)}
                                className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <img
                                    src={user.profilePic.url}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                />
                                <span className="text-white font-medium">{user.name}</span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-4">No {title.toLowerCase()} yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
