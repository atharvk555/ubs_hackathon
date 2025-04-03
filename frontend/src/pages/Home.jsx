import React from 'react';
import { ArrowRight, Book, UserCheck, Truck, School, Medal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import librar from '../assets/librar.jpg'
import { Navbar } from '../components/Navbar';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <Navbar cur_role='null'/>
            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col-reverse md:flex-row items-center">
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                            Bridging Books to <span className="text-blue-600">Bright Futures</span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                            Connect unused books with schools that need them the most. A tech-enabled
                            platform making book donations simple, transparent, and impactful.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center" onClick={()=>{
                                navigate('/signup')
                            }}>
                                Donate Books <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 flex items-center justify-center" onClick={()=>{
                                navigate('/signup')
                            }}>
                                Request Books <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <img
                            src={librar}
                            alt="Students reading donated books"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <div id="how-it-works" className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How BooKs4All Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                <UserCheck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Register & List</h3>
                            <p className="text-gray-600">
                                Donors register and list their books with photos. Schools register and request books they need.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                <Truck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Match & Deliver</h3>
                            <p className="text-gray-600">
                                Our system matches donors with nearby schools. Volunteers help with pickup and delivery.
                            </p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                                <Medal className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold mt-4 mb-2">Track & Verify</h3>
                            <p className="text-gray-600">
                                Track book delivery with unique IDs. Schools confirm receipt and donors receive appreciation certificates.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div id="impact" className="py-16 bg-blue-600 text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-4xl font-bold">5000+</p>
                            <p className="mt-2">Books Donated</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">120+</p>
                            <p className="mt-2">Schools Reached</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">800+</p>
                            <p className="mt-2">Active Donors</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold">250+</p>
                            <p className="mt-2">Volunteers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Join Us Section */}
            <div id="join" className="py-16">
                <div className="container mx-auto px-6">
                    <div className="bg-blue-50 rounded-lg p-8 md:p-12 shadow-lg">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join the Movement</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                                <Book className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Donate Books</h3>
                                <p className="text-gray-600 mb-4">Have books you no longer need? List them and make a difference.</p>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100" onClick={()=>{
                                navigate('/signup')
                            }}>
                                    Register as Donor
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                                <School className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Request Books</h3>
                                <p className="text-gray-600 mb-4">Schools can register and request books they need for students.</p>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100" onClick={()=>{
                                navigate('/signup')
                            }}>
                                    Register as School
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                                <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
                                <p className="text-gray-600 mb-4">Help us collect and deliver books to schools in need.</p>
                                <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-100" onClick={()=>{
                                navigate('/signup')
                            }}>
                                    Join as Volunteer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What People Say</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow">
                            <p className="text-gray-600 italic mb-4">
                                "BooKs4All helped our school build a library from scratch. Our students now have access to books they never had before."
                            </p>
                            <p className="font-semibold">- Principal, Government School, Chennai</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow">
                            <p className="text-gray-600 italic mb-4">
                                "As a donor, I love how easy it is to list books and see exactly where they end up. The transparency is incredible."
                            </p>
                            <p className="font-semibold">- Ravi, Book Donor, Bangalore</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg shadow">
                            <p className="text-gray-600 italic mb-4">
                                "Volunteering with BooKs4All has been rewarding. Seeing children's faces light up when we deliver books is priceless."
                            </p>
                            <p className="font-semibold">- Priya, Volunteer, Mumbai</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <div className="flex items-center">
                                <Book className="h-8 w-8 text-blue-400" />
                                <span className="ml-2 text-2xl font-bold">BooKs4All</span>
                            </div>
                            <p className="mt-4 max-w-sm">
                                Bridging the gap between book donors and schools in need through technology.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="hover:text-blue-400">Home</a></li>
                                    <li><a href="#how-it-works" className="hover:text-blue-400">How It Works</a></li>
                                    <li><a href="#impact" className="hover:text-blue-400">Our Impact</a></li>
                                    <li><a href="#join" className="hover:text-blue-400">Join Us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Join As</h3>
                                <ul className="space-y-2">
                                    <li><a href="/signup" className="hover:text-blue-400">Donor</a></li>
                                    <li><a href="/signup" className="hover:text-blue-400">School</a></li>
                                    <li><a href="/signup" className="hover:text-blue-400">Volunteer</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                <ul className="space-y-2">
                                    <li>Gmail</li>
                                    <li>Phone number</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p>&copy; {new Date().getFullYear()} BooKs4All. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};