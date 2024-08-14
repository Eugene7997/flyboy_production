import React from 'react';

const Home = () => {
    return (
        <div 
            className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
            style={{ 
                backgroundImage: 'url(/images/wallhaven-0w3kwq.jpg)', 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',  // Optional: Fixes the background image during scrolling
                filter: 'grayscale(50%)' 
            }}
        >
            {/* Use a text overlay with some shadow for readability */}
            <div className="text-center px-4 py-6">
                <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-md">Home Dashboard</h1>
                <p className="text-lg text-white drop-shadow-md">
                    Welcome home!
                </p>
            </div>
        </div>
    );
}

export default Home;
