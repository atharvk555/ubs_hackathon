import React from 'react';
import { Book } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar = ({ cur_role }) => {
    const navigate = useNavigate();

    return (
        <nav className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                        <Link to={
                            cur_role === 'donor' ? "/donor_dashboard" :
                            cur_role === 'school' ? "/school_dashboard" :
                            cur_role === 'volunteer' ? "/volunteer_dashboard" : "/"
                        }>
                        </Link>
                    }}
                >
                    <Book className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                </div>
                <div className="flex items-center space-x-4">
                    {cur_role === "null" ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <button
                                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100"
                                onClick={() => {
                                    navigate("/update_profile");
                                }}
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
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
