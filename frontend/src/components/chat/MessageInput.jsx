// import React, { useState } from "react";
// import { ChatData } from "../../context/ChatContext";
// import toast from "react-hot-toast";
// import axios from "axios";

// const MessageInput = ({ setMessages, selectedChat }) => {
//     const [textMsg, setTextMsg] = useState("");
//     const { setChats } = ChatData();

//     const handleMessage = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("/api/messages", {
//                 message: textMsg,
//                 recieverId: selectedChat.users[0]._id,
//             });

//             setMessages((message) => [...message, data]);
//             setTextMsg("");
//             setChats((prev) => {
//                 const updatedChat = prev.map((chat) => {
//                     if (chat._id === selectedChat._id) {
//                         return {
//                             ...chat,
//                             latestMessage: {
//                                 text: textMsg,
//                                 sender: data.sender,
//                             },
//                         };
//                     }

//                     return chat;
//                 });

//                 return updatedChat;
//             });
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         }
//     };
//     return (
//         <div>
//             <form onSubmit={handleMessage}>
//                 <input
//                     type="text"
//                     placeholder="enter Message"
//                     className="border border-gray-300 rounded-lg p-2 w-[80%] text-black"
//                     value={textMsg}
//                     onChange={(e) => setTextMsg(e.target.value)}
//                     required
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
//                     send
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default MessageInput;



import React, { useState } from "react";
import { ChatData } from "../../context/ChatContext";
import toast from "react-hot-toast";
import axios from "axios";
import { IoSend } from "react-icons/io5";

const MessageInput = ({ setMessages, selectedChat }) => {
    const [textMsg, setTextMsg] = useState("");
    const { setChats } = ChatData();

    const handleMessage = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/messages", {
                message: textMsg,
                recieverId: selectedChat.users[0]._id,
            });

            setMessages((message) => [...message, data]);
            setTextMsg("");
            setChats((prev) => {
                const updatedChat = prev.map((chat) => {
                    if (chat._id === selectedChat._id) {
                        return {
                            ...chat,
                            latestMessage: {
                                text: textMsg,
                                sender: data.sender,
                            },
                        };
                    }
                    return chat;
                });
                return updatedChat;
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    };

    return (
        <div className="border-t rounded-md border-gray-200 p-3 bg-white">
            <form onSubmit={handleMessage} className="flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-full py-2 px-4 outline-none text-black  focus:border-transparent"
                    value={textMsg}
                    onChange={(e) => setTextMsg(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={!textMsg.trim()}
                >
                    <IoSend className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;