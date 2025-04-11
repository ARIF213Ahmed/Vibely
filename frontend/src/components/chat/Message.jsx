// import React from "react";

// const Message = ({ ownMessage, message }) => {
//     return (
//         <div className={`mb-2 ${ownMessage ? "text-right" : "text-left"}`}>
//             <span
//                 className={`inline-block p-2 rounded-lg ${ownMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
//                     }`}
//             >
//                 {message}
//             </span>
//         </div>
//     );
// };

// export default Message;


import React from "react";

const Message = ({ ownMessage, message }) => {
    return (
        <div className={`flex mb-3 ${ownMessage ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-xs md:max-w-md lg:max-w-lg ${ownMessage ? "flex-row-reverse" : "flex-row"}`}>
                <div
                    className={`relative px-4 py-2 rounded-xl ${ownMessage
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                >
                    <p className="text-sm">{message}</p>
                    <div className={`absolute bottom-0 ${ownMessage ? "-right-1" : "-left-1"}`}>
                        <div className={`w-3 h-3 ${ownMessage ? "bg-blue-500" : "bg-gray-200"}`} style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 0%)" }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;