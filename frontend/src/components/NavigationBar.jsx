// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { AiOutlineHome, AiFillHome } from "react-icons/ai";
// import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
// import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
// import {
//     IoChatbubbleEllipses,
//     IoChatbubbleEllipsesOutline,
// } from "react-icons/io5";
// import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

// const NavigationBar = () => {
//     const [tab, setTab] = useState(window.location.pathname);

//     return (
//         <div className='fixed bottom-0 w-full bg-[#242424] py-3 border-t-2 border-[#01f83b52] '>
//             <div className="flex justify-around">
//                 <Link
//                     to={"/"}
//                     onClick={() => setTab("/")}
//                     className="flex flex-col items-center text-2xl"
//                 >
//                     <span className='text-[#01F83C]'>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
//                 </Link>
//                 <Link
//                     to={"/reels"}
//                     onClick={() => setTab("/")}
//                     className="flex flex-col items-center text-2xl"
//                 >
//                     <span className='text-[#01F83C]'>{tab === "/" ? <BsCameraReels /> : <BsCameraReelsFill />}</span>
//                 </Link>
//                 <Link
//                     to={"/search"}
//                     onClick={() => setTab("/")}
//                     className="flex flex-col items-center text-2xl"
//                 >
//                     <span className='text-[#01F83C]'><IoSearchCircleOutline /></span>
//                 </Link>
//                 <Link
//                     to={"/chat"}
//                     onClick={() => setTab("/")}
//                     className="flex flex-col items-center text-2xl"
//                 >
//                     <span className='text-[#01F83C]'><IoChatbubbleEllipses /></span>
//                 </Link>
//                 <Link
//                     to={"/account"}
//                     onClick={() => setTab("/")}
//                     className="flex flex-col items-center text-2xl"
//                 >
//                     <span className='text-[#01F83C]'>< RiAccountCircleLine /></span>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default NavigationBar



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchOutline, IoSearch } from "react-icons/io5";
import { IoChatbubbleEllipses, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    const tabs = [
        { path: "/", icon: AiOutlineHome, activeIcon: AiFillHome, label: "Home" },
        { path: "/reels", icon: BsCameraReels, activeIcon: BsCameraReelsFill, label: "Reels" },
        { path: "/search", icon: IoSearchOutline, activeIcon: IoSearch, label: "Search" },
        { path: "/chat", icon: IoChatbubbleEllipsesOutline, activeIcon: IoChatbubbleEllipses, label: "Chat" },
        { path: "/account", icon: RiAccountCircleLine, activeIcon: RiAccountCircleFill, label: "Profile" }
    ];

    return (
        <>
            {/* Desktop - Right Side Navigation */}
            <div className="hidden md:flex fixed right-0 top-1/2 transform -translate-y-1/2 h-auto py-4 px-2 bg-[#1e1e1e] bg-opacity-90 backdrop-blur-lg rounded-l-lg border-l border-t border-b border-gray-700 z-50">
                <div className="flex flex-col space-y-6 items-center">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            onClick={() => setActiveTab(tab.path)}
                            className="group relative flex items-center justify-center w-full"
                        >
                            <div className={`p-3 rounded-full transition-all duration-300 ${activeTab === tab.path ? 'bg-[#01F83C] bg-opacity-20 text-[#01F83C]' : 'text-gray-400 hover:bg-gray-800'}`}>
                                <span className="text-2xl">
                                    {activeTab === tab.path ? <tab.activeIcon /> : <tab.icon />}
                                </span>
                            </div>
                            <span className={`absolute left-0 transform -translate-x-full px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${activeTab === tab.path ? 'font-medium' : ''}`}>
                                {tab.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile - Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 w-full bg-gray-900 py-3 border-t border-gray-700 backdrop-blur-lg bg-opacity-90 z-50">
                <div className="flex justify-around items-center px-4">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.path}
                            to={tab.path}
                            onClick={() => setActiveTab(tab.path)}
                            className="flex flex-col items-center transition-all duration-300"
                        >
                            <div className={`relative flex flex-col items-center ${activeTab === tab.path ? 'text-[#01F83C]' : 'text-gray-400 hover:text-[#01F83C]'}`}>
                                <span className="text-2xl">
                                    {activeTab === tab.path ? <tab.activeIcon /> : <tab.icon />}
                                </span>
                                <span className={`text-xs mt-1 ${activeTab === tab.path ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                                    {tab.label}
                                </span>
                                {activeTab === tab.path && (
                                    <div className="absolute -top-3 w-1 h-1 bg-[#01F83C] rounded-full"></div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default NavigationBar;