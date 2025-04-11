// import React from "react";
// import { useNavigate } from "react-router-dom";

// const NotFound = () => {
//     const navigate = useNavigate();
//     return (
//         <div className="flex items-center justify-center h-screen">
//             <div className="flex-col space-y-4 text-center">
//                 <div className=" text-xl font-medium text-[#01F83C]">Vibely</div>
//                 <div className="text-5xl font-medium">Page not found</div>
//                 <div className="text-gray-500">sorry, this page isn't available</div>
//                 <div className="flex items-center justify-center">
//                     <div
//                         onClick={() => navigate("/")}
//                         className="bg-gray-600 px-4 py-1 text-white font-medium rounded-lg hover:scale-105 cursor-pointer"
//                     >
//                         Visit Homepage
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotFound;


import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#242424] min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md text-center space-y-6">
                {/* Logo/Brand */}
                <div className="text-3xl font-bold text-[#01F83C]">Vibely</div>

                {/* Main Message */}
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold text-white">404</h1>
                    <h2 className="text-3xl font-medium text-white">Page Not Found</h2>
                    <p className="text-gray-400 text-lg">
                        Sorry, the page you're looking for isn't available.
                    </p>
                </div>

                {/* Home Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-3 bg-[#01F83C] hover:bg-[#01d634] text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                    <FaHome />
                    <span>Return to Homepage</span>
                </button>

                {/* Additional Help */}
                <p className="text-gray-500 text-sm mt-8">
                    If you believe this is an error, please contact support.
                </p>
            </div>
        </div>
    );
};

export default NotFound;