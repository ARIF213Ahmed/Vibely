// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { LoadingAnimation } from "../components/Loading";

// const Search = () => {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [loading, setLoading] = useState(false);
//     async function fetchUsers() {
//         setLoading(true);
//         try {
//             const { data } = await axios.get("/api/user/all?search=" + search);

//             setUsers(data);
//             setLoading(false);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }
//     return (
//         <div className=" min-h-screen">
//             <div className="flex justify-center items-center flex-col pt-5">
//                 <div className="search flex justify-between items-center gap-4">
//                     <input
//                         type="text"
//                         className="custom-input"
//                         style={{ border: "gray solid 1px" }}
//                         placeholder="Enter Name"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     <button
//                         onClick={fetchUsers}
//                         className="px-3 py-2 bg-blue-500 text-white rounded-md"
//                     >
//                         Search
//                     </button>
//                 </div>
//                 {loading ? (
//                     <LoadingAnimation />
//                 ) : (
//                     <>
//                         {users && users.length > 0 ? (
//                             users.map((e) => (
//                                 <Link
//                                     key={e._id}
//                                     className="mt-3 px-10 py-2 bg-gray-500 rounded-md flex  "
//                                     to={`/user/${e._id}`}
//                                 >
//                                     <div className="flex gap-3 justify-start -ml-7">
//                                         <img
//                                             src={e.profilePic.url}
//                                             alt=""
//                                             className="w-8 h-8 rounded-full "
//                                         />{" "}
//                                         {e.name}
//                                     </div>
//                                 </Link>
//                             ))
//                         ) : (
//                             <p className="text-sm mt-2">No User found</p>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Search;


import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";
import { FiSearch } from "react-icons/fi";

const Search = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(0);

    useEffect(() => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        if (search.trim()) {
            setLoading(true);
            const timeoutId = setTimeout(() => {
                fetchUsers();
            }, 500);

            setTypingTimeout(timeoutId);
        } else {
            setUsers([]);
        }

        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [search]);

    async function fetchUsers() {
        try {
            const { data } = await axios.get("/api/user/all?search=" + search);
            setUsers(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#242424] min-h-screen text-white">
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Search Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#01F83C] mb-2">Find Users</h1>
                    <p className="text-gray-400">Search for friends and creators</p>
                </div>

                {/* Search Input */}
                <div className="relative max-w-md mx-auto mb-8">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-[#1E1E1E] text-white pl-10 pr-4 py-3 rounded-lg outline-none  "
                        placeholder="Search by username..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        autoFocus
                    />
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center">
                        <LoadingAnimation />
                    </div>
                ) : (
                    <div className="space-y-3 max-w-md mx-auto">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <Link
                                    key={user._id}
                                    to={`/user/${user._id}`}
                                    className="flex items-center p-3 bg-[#1E1E1E] hover:bg-[#1e1e1e3f] rounded-lg transition-colors duration-200"
                                >
                                    <img
                                        src={user.profilePic.url}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                    />
                                    <div className="ml-4">
                                        <h3 className="font-medium text-white">{user.name}</h3>
                                        <p className="text-sm text-gray-400">{user.username || user.email}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            search.trim() && !loading && (
                                <div className="text-center py-10">
                                    <p className="text-gray-400">No users found for "{search}"</p>
                                    <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;