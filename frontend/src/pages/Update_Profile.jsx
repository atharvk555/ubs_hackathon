import React, { useState, useEffect } from 'react';
import { Book, User, Phone, MapPin, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Backend_url } from '../config'; // Define your backend URL

export const Update_Profile = () => {
    const [cur_role, setRole] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             console.log("Raw Token:", token);
        
    //             if (!token) {
    //                 console.error("No token found!");
    //                 return;
    //             }
        
    //             // Decode the JWT token
    //             const decodedToken = jwtDecode(token);
    //             console.log("Decoded Token:", decodedToken);
        
    //             if (decodedToken?.role) {
    //                 setRole(decodedToken.role);
    //                 console.log("User Role:", decodedToken.role);
    //             } else {
    //                 console.error("Role not found in token!");
    //             }
        
    //             // Fetch user data from backend
    //             const response = await axios.get(`${Backend_url}/api/user_data`, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
        
    //             setFormData(response.data);
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${Backend_url}/api/user/update_profile`, formData, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Book className="h-8 w-8 text-blue-600" />
                        <span className="ml-2 text-2xl font-bold text-blue-800">BooKs4All</span>
                    </div>
                    <Link to={
                        cur_role === 'donor' ? "/donor_dashboard" :
                        cur_role === 'school' ? "/school_dashboard" :
                        cur_role === 'volunteer' ? "/volunteer_dashboard" :
                        "/"
                    } className="flex items-center text-blue-600 hover:text-blue-800">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Your Profile</h1>

                    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                        Personal Information
                                    </h2>
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            placeholder="Your Phone Number"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="pl-10 block w-full rounded-md border border-gray-300 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Your Address"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-4">
                                <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                    <Save className="mr-2 h-5 w-5" />
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
