import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    
    return (
        <header className="bg-gray-100 shadow-md">
            <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
                <Link to='/' className="text-2xl font-semibold text-black-600 hover:text-blue-800">
                    <div className='flex flex-items'>
                        <img src="/images/flyboy.png" alt="FlyBoy Logo" className="w-8 h-8 mr-2" />
                        FlyBoy
                    </div>
                </Link>
                <nav>
                    <ul className='flex gap-6'>
                        <li>
                            <Link to='/' className="text-gray-800 hover:text-gray-900">Home</Link>
                        </li>
                        <li>
                            <Link to='/about' className="text-gray-800 hover:text-gray-900">About</Link>
                        </li>
                        {currentUser ? (
                            <>
                                <li>
                                    <Link to='/flightlogs' className="text-gray-800 hover:text-gray-900">Flights</Link>
                                </li>
                                <li>
                                    <Link to='/profile' className="text-gray-800 hover:text-gray-900">Profile</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to='/sign_in' className="text-gray-800 hover:text-gray-900">Sign In</Link>
                            </li>
                        )}
                        {!currentUser && (
                            <li>
                                <Link to='/sign_up' className="text-gray-800 hover:text-gray-900">Sign Up</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
