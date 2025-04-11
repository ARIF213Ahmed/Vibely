// // import React from "react";
// // import { UserData } from "../../context/UserContext";
// // import { BsSendCheck } from "react-icons/bs";

// // const Chat = ({ chat, setSelectedChat, isOnline }) => {
// //     const { user: loggedInUser } = UserData();
// //     let user;
// //     if (chat) user = chat.users[0];
// //     return (
// //         <div>
// //             {user && (
// //                 <div
// //                     className="bg-gray-200 py-2 px-1 rounded-md cursor-pointer mt-3"
// //                     onClick={() => setSelectedChat(chat)}
// //                 >
// //                     <div className="flex justify-center items-center gap-2">
// //                         {isOnline && (
// //                             <div className="text-5xl font-bold text-green-400">.</div>
// //                         )}
// //                         <img
// //                             src={user.profilePic.url}
// //                             alt=""
// //                             className="w-8 h-8 rounded-full"
// //                         />
// //                         <span>{user.name}</span>
// //                     </div>

// //                     <span className="flex justify-center items-center gap-1">
// //                         {loggedInUser._id === chat.latestMessage.sender ? (
// //                             <BsSendCheck />
// //                         ) : (
// //                             ""
// //                         )}
// //                         {chat.latestMessage.text.slice(0, 18)}...
// //                     </span>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Chat;

// import React from 'react'
// import { UserData } from "../../context/UserContext";
// import { BsSendCheck } from "react-icons/bs";

// const Chat = ({ chat, setSelectedChat, isOnline }) => {

//     const { user: loggedInUser } = UserData();
//     let user;
//     if (chat) user = chat.users[0];

//     return (
//         <div>
//             {
//                 user && (
//                     <div onClick={() => setSelectedChat(chat)} className="bg-gray-200 py-2 px-1 rounded-md cursor-pointer mt-3">
//                         <div className="flex justify-center items-center gap-2">

//                             {isOnline && (<div className="text-5xl font-bold text-green-400">.</div>)}

//                             <img
//                                 src={user.profilePic.url}
//                                 alt=""
//                                 className="w-8 h-8 rounded-full"
//                             />
//                             <span>{user.name}</span>
//                         </div>
//                         <span className="flex justify-center items-center gap-1">
//                             {loggedInUser._id === chat.latestMessage.sender ? (
//                                 <BsSendCheck />
//                             ) : (
//                                 ""
//                             )}
//                             {chat.latestMessage.text.slice(0, 18)}...
//                         </span>

//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default Chat



import React from 'react';
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline, isTyping }) => {
    const { user: loggedInUser } = UserData();
    let user;
    if (chat) user = chat.users[0];

    return (
        <div className="px-2 ">
            {user && (
                <div
                    onClick={() => setSelectedChat(chat)}
                    className="flex items-center text-white p-3 hover:bg-gray-50 hover:text-black rounded-lg cursor-pointer transition-colors"
                >
                    {/* Online status indicator */}
                    <div className="relative mr-3">
                        <img
                            src={user.profilePic.url}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        {isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white">.</div>
                        )}
                    </div>

                    {/* Chat info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                            </h3>
                            {/* Add timestamp here if needed */}
                        </div>

                        <div className="flex items-center">
                            {loggedInUser._id === chat.latestMessage.sender && (
                                <BsSendCheck className="text-gray-400 mr-1" size={14} />
                            )}
                            <p className="text-xs text-gray-500 truncate">
                                {isTyping ? (
                                    <span className="text-blue-500 italic">typing...</span>
                                ) : (
                                    chat.latestMessage.text.slice(0, 30) +
                                    (chat.latestMessage.text.length > 30 ? "..." : "")
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
