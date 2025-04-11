// import React, { useEffect, useState } from 'react';
// import { ChatData } from "../context/ChatContext";
// import axios from 'axios';
// import { FaSearch } from "react-icons/fa";
// import Chat from '../components/chat/Chat';
// import MessageContainer from '../components/chat/MessageContainer';
// import { SocketData } from "../context/SocketContext";

// const ChatPage = ({ user }) => {
//     const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData();
//     const [users, setUsers] = useState([]);
//     const [query, setQuery] = useState("");
//     const [search, setSearch] = useState(false);

//     async function fetchAllUsers() {
//         try {
//             const { data } = await axios.get("/api/user/all?search=" + query);

//             setUsers(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getAllChats = async () => {
//         try {
//             const { data } = await axios.get("/api/messages/chats");
//             setChats(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchAllUsers();
//     }, [query]);

//     useEffect(() => {
//         getAllChats();
//     }, []);

//     async function createNewChat(id) {
//         await createChat(id);
//         setSearch(false);
//         getAllChats();
//     }

//     const { onlineUsers, socket } = SocketData();

//     return (
//         <div className='w-[100%] md:w-[750px] md:p-4  '>
//             <div className="flex gap-4 mx-auto  ">
//                 <div className="w-[30%] ">
//                     <div className="top ">
//                         <button
//                             className="bg-blue-500 text-white px-3 py-1 rounded-full"
//                             onClick={() => setSearch(!search)}
//                         >
//                             {search ? "X" : <FaSearch />}
//                         </button>
//                         {
//                             search ? (<>

//                                 <input
//                                     type="text"
//                                     className="custom-input1"
//                                     style={{ width: "100px", border: "gray solid 1px" }}
//                                     placeholder="Enter name"
//                                     value={query}
//                                     onChange={(e) => setQuery(e.target.value)}
//                                 />

//                                 <div className="users">
//                                     {
//                                         users && users.length > 0 ? (users.map((e) => (

//                                             <div
//                                                 key={e._id}
//                                                 onClick={() => createNewChat(e._id)}
//                                                 className="bg-gray-500 text-white p-2 mt-2 cursor-pointer flex justify-center items-center gap-2">
//                                                 <img
//                                                     src={e.profilePic.url}
//                                                     className="w-8 h-8 rounded-full"
//                                                     alt=""
//                                                 />
//                                                 {e.name}
//                                             </div>
//                                         ))) : (<p>No users</p>)
//                                     }
//                                 </div>

//                             </>
//                             ) : (<div className="flex flex-col justify-center items-center mt-2">
//                                 {
//                                     chats.map(e => (
//                                         <Chat
//                                             key={e._id}
//                                             chat={e}
//                                             setSelectedChat={setSelectedChat}
//                                             isOnline={onlineUsers.includes(e.users[0]._id)}
//                                         />
//                                     ))
//                                 }
//                             </div>)
//                         }
//                     </div>
//                 </div>

//                 {
//                     selectedChat === null ? (<div className="w-[70%]  mx-20 mt-40 text-2xl">hello 👋 {user.name} select a chat to start conversation</div>) :
//                         (
//                             <div className="w-[70%]">
//                                 <MessageContainer selectedChat={selectedChat} setChats={setChats} />
//                             </div>
//                         )
//                 }

//             </div>
//         </div>
//     )
// }

// export default ChatPage







// import React, { useEffect, useState } from 'react';
// import { ChatData } from "../context/ChatContext";
// import axios from 'axios';
// import { FaSearch, FaTimes } from "react-icons/fa";
// import { IoMdSend } from "react-icons/io";
// import Chat from '../components/chat/Chat';
// import MessageContainer from '../components/chat/MessageContainer';
// import { SocketData } from "../context/SocketContext";

// const ChatPage = ({ user }) => {
//     const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData();
//     const [users, setUsers] = useState([]);
//     const [query, setQuery] = useState("");
//     const [search, setSearch] = useState(false);

//     async function fetchAllUsers() {
//         try {
//             const { data } = await axios.get("/api/user/all?search=" + query);
//             setUsers(data);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getAllChats = async () => {
//         try {
//             const { data } = await axios.get("/api/messages/chats");
//             setChats(data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchAllUsers();
//     }, [query]);

//     useEffect(() => {
//         getAllChats();
//     }, []);

//     async function createNewChat(id) {
//         await createChat(id);
//         setSearch(false);
//         getAllChats();
//     }

//     const { onlineUsers, socket } = SocketData();

//     return (
//         <div className='w-full max-w-6xl mx-auto h-[calc(100vh-80px)] flex'>
//             {/* Sidebar */}
//             <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
//                 {/* Header */}
//                 <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
//                     <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
//                     <button
//                         className="p-2 rounded-full hover:bg-gray-100 transition-colors"
//                         onClick={() => setSearch(!search)}
//                     >
//                         {search ? <FaTimes className="text-gray-500" /> : <FaSearch className="text-gray-500" />}
//                     </button>
//                 </div>

//                 {/* Search or Chat List */}
//                 <div className="flex-1 overflow-y-auto">
//                     {search ? (
//                         <div className="p-4">
//                             <div className="relative mb-4">
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                     placeholder="Search users..."
//                                     value={query}
//                                     onChange={(e) => setQuery(e.target.value)}
//                                 />
//                                 <FaSearch className="absolute left-3 top-3 text-gray-400" />
//                             </div>

//                             <div className="space-y-2">
//                                 {users.length > 0 ? (
//                                     users.map((e) => (
//                                         <div
//                                             key={e._id}
//                                             onClick={() => createNewChat(e._id)}
//                                             className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
//                                         >
//                                             <div className="relative">
//                                                 <img
//                                                     src={e.profilePic.url}
//                                                     className="w-10 h-10 rounded-full object-cover"
//                                                     alt={e.name}
//                                                 />
//                                                 {onlineUsers.includes(e._id) && (
//                                                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                                                 )}
//                                             </div>
//                                             <div className="ml-3">
//                                                 <p className="font-medium text-gray-800">{e.name}</p>
//                                                 <p className="text-xs text-gray-500">
//                                                     {onlineUsers.includes(e._id) ? 'Online' : 'Offline'}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <p className="text-center text-gray-500 py-4">No users found</p>
//                                 )}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="divide-y divide-gray-100">
//                             {chats.map(e => (
//                                 <Chat
//                                     key={e._id}
//                                     chat={e}
//                                     setSelectedChat={setSelectedChat}
//                                     isOnline={onlineUsers.includes(e.users[0]._id)}
//                                 />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Main Chat Area */}
//             {selectedChat === null ? (
//                 <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 p-6">
//                     <div className="text-center max-w-md">
//                         <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
//                             <IoMdSend className="text-blue-500 text-2xl" />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-800 mb-2">Hello {user.name}!</h3>
//                         <p className="text-gray-500 mb-6">Select a chat to start your conversation</p>
//                         <button
//                             onClick={() => setSearch(true)}
//                             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                         >
//                             New Message
//                         </button>
//                     </div>
//                 </div>
//             ) : (
//                 <div className={`flex-1 flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'}`}>
//                     <MessageContainer selectedChat={selectedChat} setChats={setChats} />
//                 </div>
//             )}
//         </div>
//     )
// }

// export default ChatPage




import React, { useEffect, useState } from 'react';
import { ChatData } from "../context/ChatContext";
import axios from 'axios';
import { FaSearch, FaTimes } from "react-icons/fa";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import Chat from '../components/chat/Chat';
import MessageContainer from '../components/chat/MessageContainer';
import { SocketData } from "../context/SocketContext";

const ChatPage = ({ user }) => {
    const { createChat, selectedChat, setSelectedChat, chats, setChats } = ChatData();
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [search, setSearch] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState("");

    async function fetchAllUsers() {
        try {
            const { data } = await axios.get("/api/user/all?search=" + query);
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllChats = async () => {
        try {
            const { data } = await axios.get("/api/messages/chats");
            setChats(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [query]);

    useEffect(() => {
        getAllChats();

        const typingInterval = setInterval(() => {
            if (selectedChat && Math.random() > 0.7) {
                setIsTyping(true);
                setTypingUser(selectedChat.users[0].name);
                setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        }, 10000);

        return () => clearInterval(typingInterval);
    }, [selectedChat]);

    async function createNewChat(id) {
        await createChat(id);
        setSearch(false);
        getAllChats();
    }

    const { onlineUsers } = SocketData();

    return (
        <div className="flex h-[calc(100vh-60px)]    " style={{ width: '70vw' }}>
            {/* Left sidebar - Dark */}
            <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} flex-col w-64 border-r border-gray-700 bg-gray-800`}>
                {/* Header */}
                <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-white">Messages</h1>
                    <button
                        onClick={() => setSearch(!search)}
                        className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                    >
                        {search ? <FaTimes className="text-gray-300" /> : <FaSearch className="text-gray-300" />}
                    </button>
                </div>

                {/* Search or Chat list */}
                <div className="flex-1 overflow-y-auto rounded-md">
                    {search ? (
                        <div className="p-3">
                            <div className="relative mb-3">
                                <input
                                    type="text"
                                    className="w-full pl-9 pr-3 py-1.5 text-sm rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Search users..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    autoFocus
                                />
                                <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
                            </div>

                            {users.length > 0 ? (
                                <div className="space-y-1">
                                    {users.map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() => createNewChat(user._id)}
                                            className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer transition-colors"
                                        >
                                            <div className="relative">
                                                <img
                                                    src={user.profilePic.url}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                    alt={user.name}
                                                />
                                                {onlineUsers.includes(user._id) && (
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-gray-800"></div>
                                                )}
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-sm font-medium text-white">{user.name}</p>
                                                <p className="text-xs text-gray-400">
                                                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-400 py-3 text-sm">No users found</p>
                            )}
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-700 ">
                            {chats.map(chat => (
                                <Chat
                                    key={chat._id}
                                    chat={chat}
                                    setSelectedChat={setSelectedChat}
                                    isOnline={onlineUsers.includes(chat.users[0]._id)}
                                    isTyping={isTyping && chat._id === selectedChat?._id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Right content area - White */}
            <div className={`flex-1 rounded-md  flex flex-col ${!selectedChat ? 'hidden md:flex' : 'flex'} bg-white border-l border-gray-200`}>
                {selectedChat ? (
                    <MessageContainer
                        selectedChat={selectedChat}
                        setChats={setChats}
                        setSelectedChat={setSelectedChat}
                        isTyping={isTyping}
                        typingUser={typingUser}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                        <div className="text-center max-w-xs">
                            <div className="mx-auto mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-500">
                                <HiOutlineChatBubbleLeft className="w-5 h-5" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-1">
                                Hello, {user.name}!
                            </h2>
                            <p className="text-gray-500 text-sm mb-4">
                                Select a conversation to start chatting
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;