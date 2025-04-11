// import React, { useEffect, useRef, useState } from "react";
// import { UserData } from "../../context/UserContext";
// import axios from "axios";
// import { LoadingAnimation } from "../Loading";
// import Message from "./Message";
// import MessageInput from "./MessageInput";
// import { SocketData } from "../../context/SocketContext";

// const MessageContainer = ({ selectedChat, setChats }) => {
//     const [messages, setMessages] = useState([]);
//     const { user } = UserData();
//     const [loading, setLoading] = useState(false);
//     const { socket } = SocketData();

//     useEffect(() => {
//         socket.on("newMessage", (message) => {
//             if (selectedChat._id === message.chatId) {
//                 setMessages((prev) => [...prev, message]);
//             }

//             setChats((prev) => {
//                 const updatedChat = prev.map((chat) => {
//                     if (chat._id === message.chatId) {
//                         return {
//                             ...chat,
//                             latestMessage: {
//                                 text: message.text,
//                                 sender: message.sender,
//                             },
//                         };
//                     }
//                     return chat;
//                 });
//                 return updatedChat;
//             });
//         });

//         return () => socket.off("newMessage");
//     }, [socket, selectedChat, setChats]);

//     async function fetchMessages() {
//         setLoading(true);
//         try {
//             const { data } = await axios.get(
//                 "/api/messages/" + selectedChat.users[0]._id
//             );

//             setMessages(data);
//             setLoading(false);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     console.log(messages);

//     useEffect(() => {
//         fetchMessages();
//     }, [selectedChat]);

//     const messageContainerRef = useRef(null);

//     useEffect(() => {
//         if (messageContainerRef.current) {
//             messageContainerRef.current.scrollTop =
//                 messageContainerRef.current.scrollHeight;
//         }
//     }, [messages]);
//     return (
//         <div>
//             {selectedChat && (
//                 <div className="flex flex-col">
//                     <div className="flex w-full h-12 items-center gap-3">
//                         <img
//                             src={selectedChat.users[0].profilePic.url}
//                             className="w-8 h-8 rounded-full"
//                             alt=""
//                         />
//                         <span>{selectedChat.users[0].name}</span>
//                     </div>
//                     {loading ? (
//                         <LoadingAnimation />
//                     ) : (
//                         <>
//                             <div
//                                 ref={messageContainerRef}
//                                 className="flex flex-col gap-4 my-4 h-[400px] overflow-y-auto border border-gray-300 bg-gray-100 p-3"
//                             >
//                                 {messages &&
//                                     messages.map((e) => (
//                                         <Message
//                                             message={e.text}
//                                             ownMessage={e.sender === user._id && true}
//                                         />
//                                     ))}
//                             </div>

//                             <MessageInput
//                                 setMessages={setMessages}
//                                 selectedChat={selectedChat}
//                             />
//                         </>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MessageContainer;



// import React, { useEffect, useRef, useState } from "react";
// import { UserData } from "../../context/UserContext";
// import axios from "axios";
// import { LoadingAnimation } from "../Loading";
// import Message from "./Message";
// import MessageInput from "./MessageInput";
// import { SocketData } from "../../context/SocketContext";
// import { IoIosArrowDown } from "react-icons/io";

// const MessageContainer = ({ selectedChat, setChats }) => {
//     const [messages, setMessages] = useState([]);
//     const { user } = UserData();
//     const [loading, setLoading] = useState(false);
//     const { socket } = SocketData();
//     const [showScrollButton, setShowScrollButton] = useState(false);
//     const messageContainerRef = useRef(null);
//     const [isInitialLoad, setIsInitialLoad] = useState(true);

//     // Socket message handling
//     useEffect(() => {
//         socket.on("newMessage", (message) => {
//             if (selectedChat._id === message.chatId) {
//                 setMessages((prev) => [...prev, message]);
//             }

//             setChats((prev) => {
//                 const updatedChat = prev.map((chat) => {
//                     if (chat._id === message.chatId) {
//                         return {
//                             ...chat,
//                             latestMessage: {
//                                 text: message.text,
//                                 sender: message.sender,
//                             },
//                         };
//                     }
//                     return chat;
//                 });
//                 return updatedChat;
//             });
//         });

//         return () => socket.off("newMessage");
//     }, [socket, selectedChat, setChats]);

//     // Fetch messages
//     async function fetchMessages() {
//         setLoading(true);
//         try {
//             const { data } = await axios.get(
//                 "/api/messages/" + selectedChat.users[0]._id
//             );
//             setMessages(data);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (selectedChat) {
//             fetchMessages();
//             setIsInitialLoad(true);
//         }
//     }, [selectedChat]);

//     // Auto-scroll to bottom on initial load and new messages
//     useEffect(() => {
//         const container = messageContainerRef.current;
//         if (container) {
//             if (isInitialLoad && messages.length > 0) {
//                 container.scrollTop = container.scrollHeight;
//                 setIsInitialLoad(false);
//             } else {
//                 const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
//                 if (isNearBottom) {
//                     container.scrollTop = container.scrollHeight;
//                 }
//             }
//         }
//     }, [messages, isInitialLoad]);

//     const handleScroll = () => {
//         const container = messageContainerRef.current;
//         if (container) {
//             setShowScrollButton(
//                 container.scrollHeight - container.scrollTop - container.clientHeight > 100
//             );
//         }
//     };

//     const scrollToBottom = () => {
//         if (messageContainerRef.current) {
//             messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
//         }
//     };

//     return (
//         <div className="flex flex-col  h-[85vh]">
//             {selectedChat && (
//                 <>
//                     {/* Chat header - Removed online status text */}
//                     <div className="flex items-center p-3 border-b border-gray-200 bg-white">
//                         <img
//                             src={selectedChat.users[0].profilePic.url}
//                             className="w-10 h-10 rounded-full object-cover"
//                             alt={selectedChat.users[0].name}
//                         />
//                         <div className="ml-3">
//                             <h3 className="font-medium text-gray-900">
//                                 {selectedChat.users[0].name}
//                             </h3>
//                         </div>
//                     </div>

//                     {/* Messages area */}
//                     {loading ? (
//                         <div className="flex-1 flex items-center justify-center">
//                             <LoadingAnimation />
//                         </div>
//                     ) : (
//                         <div className="flex-1 flex flex-col min-h-0 ">
//                             <div
//                                 ref={messageContainerRef}
//                                 onScroll={handleScroll}
//                                 className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
//                                 style={{ minHeight: 0 }}
//                             >
//                                 {messages.map((message, index) => (
//                                     <Message
//                                         key={index}
//                                         message={message.text}
//                                         ownMessage={message.sender === user._id}
//                                         timestamp={message.createdAt}
//                                     />
//                                 ))}
//                             </div>



//                             {/* Message input */}
//                             <div className="p-3 border-t border-gray-200 bg-white">
//                                 <MessageInput
//                                     setMessages={setMessages}
//                                     selectedChat={selectedChat}
//                                     scrollToBottom={scrollToBottom}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default MessageContainer;





import React, { useEffect, useRef, useState } from "react";
import { UserData } from "../../context/UserContext";
import axios from "axios";
import { LoadingAnimation } from "../Loading";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { SocketData } from "../../context/SocketContext";
import { IoArrowBack } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

const MessageContainer = ({ selectedChat, setChats, setSelectedChat, isTyping, typingUser }) => {
    const [messages, setMessages] = useState([]);
    const { user } = UserData();
    const [loading, setLoading] = useState(false);
    const { socket } = SocketData();
    const messageContainerRef = useRef(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const isMobile = useMediaQuery({ maxWidth: 768 });

    // Socket message handling
    useEffect(() => {
        socket.on("newMessage", (message) => {
            if (selectedChat._id === message.chatId) {
                setMessages((prev) => [...prev, message]);
            }

            setChats((prev) => {
                const updatedChat = prev.map((chat) => {
                    if (chat._id === message.chatId) {
                        return {
                            ...chat,
                            latestMessage: {
                                text: message.text,
                                sender: message.sender,
                            },
                        };
                    }
                    return chat;
                });
                return updatedChat;
            });
        });

        return () => socket.off("newMessage");
    }, [socket, selectedChat, setChats]);

    // Fetch messages
    async function fetchMessages() {
        setLoading(true);
        try {
            const { data } = await axios.get(
                "/api/messages/" + selectedChat.users[0]._id
            );
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (selectedChat) {
            fetchMessages();
            setIsInitialLoad(true);
        }
    }, [selectedChat]);

    // Auto-scroll to bottom
    useEffect(() => {
        const container = messageContainerRef.current;
        if (container && messages.length > 0) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleBackClick = () => {
        setSelectedChat(null); // This will make the parent show the Chat list
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat header with back button for mobile */}
            <div className="flex items-center p-3 border-b border-gray-200 bg-white">
                {isMobile && (
                    <button
                        onClick={handleBackClick}
                        className="mr-2 text-gray-600 hover:text-gray-900"
                    >
                        <IoArrowBack size={24} />
                    </button>
                )}

                <div className="flex items-center">
                    <img
                        src={selectedChat.users[0].profilePic.url}
                        className="w-10 h-10 rounded-full object-cover"
                        alt={selectedChat.users[0].name}
                    />
                    <div className="ml-3">
                        <h3 className="font-medium text-gray-900">
                            {selectedChat.users[0].name}
                        </h3>
                        {isTyping && (
                            <p className="text-xs text-gray-500">
                                {typingUser} is typing...
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Messages area */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <LoadingAnimation />
                </div>
            ) : (
                <div className="flex-1 flex flex-col min-h-0">
                    <div
                        ref={messageContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
                        style={{ minHeight: 0 }}
                    >
                        {messages.map((message, index) => (
                            <Message
                                key={index}
                                message={message.text}
                                ownMessage={message.sender === user._id}
                                timestamp={message.createdAt}
                            />
                        ))}
                    </div>

                    {/* Message input */}
                    <div className="p-3 border-t border-gray-200 bg-white">
                        <MessageInput
                            setMessages={setMessages}
                            selectedChat={selectedChat}
                            scrollToBottom={scrollToBottom}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageContainer;