import React from 'react';
import { Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Base Navbar that will be customized for each role
export const Navbar = ({ cur_role }) => {
    const navigate = useNavigate();
    
    // Determine which navbar to render based on the role
    if (cur_role === 'donor') {
        return <DonorNavbar navigate={navigate} />;
    } else if (cur_role === 'school') {
        return <SchoolNavbar navigate={navigate} />;
    } else if (cur_role === 'volunteer') {
        return <VolunteerNavbar navigate={navigate} />;
    } else {
        return <GuestNavbar navigate={navigate} />;
    }
};

// Guest Navbar (for users not logged in)
const GuestNavbar = ({ navigate }) => {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <Book className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => navigate('/signup')}
                    >
                        Register
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Donor Navbar
const DonorNavbar = ({ navigate }) => {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/donor_dashboard')}
                >
                    <Book className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/donor_dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/update_profile')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

// School Navbar
const SchoolNavbar = ({ navigate }) => {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/school_dashboard')}
                >
                    <Book className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/school_dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/request')}
                    >
                        Request Books
                    </button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/update_profile')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Volunteer Navbar
const VolunteerNavbar = ({ navigate }) => {
    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/volunteer_dashboard')}
                >
                    <Book className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/volunteer_dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/volunteer_order')}
                    >
                        Orders
                    </button>
                    <button
                        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                        onClick={() => navigate('/update_profile')}
                    >
                        Update Profile
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;