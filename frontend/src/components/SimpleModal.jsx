// import React from "react";

// const SimpleModal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
//             <div className="bg-white rounded-lg p-4 shadow-lg w-64">
//                 <div className="flex justify-end relative">
//                     <button onClick={onClose} className="text-gray-500 text-2xl absolute -top-5 -right-2">
//                         &times;
//                     </button>
//                 </div>
//                 <div className="flex flex-col space-y-2 mt-2">{children}</div>
//             </div>
//         </div>
//     );
// };

// export default SimpleModal;

import React from "react";

const SimpleModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div
                className="w-[250px]  bg-gray-800 rounded-xl shadow-xl  max-w-md max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gray-800 p-1 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl transition-colors"
                    >
                        &times;
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SimpleModal;