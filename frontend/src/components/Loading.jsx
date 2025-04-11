// export const Loading = () => {
//     return (
//         <div className="flex items-center justify-center max-h-screen bg-[#242424]">
//             <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
//         </div>
//     );
// };

// export const LoadingAnimation = () => {
//     return (
//         <div className="inline-block w-5 h-5 border-2 border-t-2 border-r-transparent border-red-500 rounded-full animate-spin"></div>
//     );
// };

export const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1e1e1e] bg-opacity-80 z-50">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    {/* Single smooth spinning ring */}
                    <div className="h-16 w-16 border-4 border-[#01F83C] border-t-transparent rounded-full animate-spin"></div>
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-[#01F83C]"></div>
                    </div>
                </div>
                <p className="text-[#01F83C] font-medium">Loading...</p>
            </div>
        </div>
    );
};

export const LoadingAnimation = () => {
    return (
        <div className="inline-flex items-center justify-center">
            <div className="h-5 w-5 border-2 border-[#01F83C] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};