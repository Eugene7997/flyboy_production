import React from 'react';

const About = () => {
    return (
        <div 
            className="relative min-h-screen bg-gray-100 py-12 px-4"
            style={{ backgroundImage: 'url(/images/wallhaven-ymx1mx.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="bg-gray-800 bg-opacity-70 p-8 mb-32 rounded-lg shadow-lg max-w-4xl text-center mx-auto mb-8">
                <h1 className="text-4xl font-bold text-white mb-6">About Us</h1>
                <p className="text-lg text-white">
                    Welcome to FlyBoy! FlyBoy aims to provide you a quick and easy way to look up, update, create, and delete flight logs.
                </p>
            </div>

            <div className="bg-gray-800 bg-opacity-60 p-8 mt-48 rounded-lg shadow-lg max-w-4xl text-center mx-auto">
                <h1 className="text-4xl font-bold text-white mb-6">Our Expertise</h1>
                <p className="text-lg text-white">
                    With years of experience in the industry, we have honed our skills and knowledge to meet the needs of our diverse clientele. Whether you're looking for innovative solutions or expert advice, we're here to help you every step of the way.
                </p>
            </div>
        </div>
    );
}

export default About;
