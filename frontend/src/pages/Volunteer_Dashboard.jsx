import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { BookOpen, Navigation, MapPin, Check, Truck, Clock } from 'lucide-react';
import axios from 'axios';
import { Backend_url } from '../config';

export const Volunteer_Dashboard = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [acceptingOrderId, setAcceptingOrderId] = useState(null);

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const fetchPendingOrders = async () => {
        setLoading(true);
        try {
            // Get the auth token from local storage or wherever you store it
            const token = localStorage.getItem('token');
            console.log(token)
            
            if (!token) {
                setError("Please login to continue");
                setLoading(false);
                return;
            }

            const response = await axios.post(`${Backend_url}/api/school/getAllPendingRequests`);

            setPendingOrders(response.data.orders || []);
            console.log(response?.data.orders)
            // setPendingOrders([{
            //     _id: "ord123456",
            //     book: {
            //       title: "The Great Gatsby",
            //       author: "F. Scott Fitzgerald",
            //       publisher: "Scribner",
            //     },
            //     sourceAddress: "123 Library Lane, Bookville, BK 90210",
            //     destinationAddress: "456 Reader Road, Bookville, BK 90211",
            //     distance: 2.4,
            //   },
            //   {
            //     _id: "ord789012",
            //     book: {
            //       title: "To Kill a Mockingbird",
            //       author: "Harper Lee",
            //       publisher: "J.B. Lippincott & Co.",
            //     },
            //     sourceAddress: "789 Bookstore Ave, Bookville, BK 90220",
            //     destinationAddress: "101 Novel Street, Bookville, BK 90225",
            //     distance: 0.8,
            //   },
            //   {
            //     _id: "ord345678",
            //     book: {
            //       title: "1984",
            //       author: "George Orwell",
            //       publisher: "Secker & Warburg",
            //     },
            //     sourceAddress: "202 Library Circle, Bookville, BK 90215",
            //     destinationAddress: "303 Reading Lane, Bookville, BK 90218",
            //     distance: 3.7,
            //   },
            //   {
            //     _id: "ord901234",
            //     book: {
            //       title: "The Hobbit",
            //       author: "J.R.R. Tolkien",
            //       publisher: "Allen & Unwin",
            //     },
            //     sourceAddress: "404 Fantasy Blvd, Bookville, BK 90230",
            //     destinationAddress: "505 Middle Earth Road, Bookville, BK 90235",
            //     distance: 0.5,
            //   }]);
        } catch (err) {
            console.error("Error fetching pending orders:", err);
            setError(err.response?.data?.message || err.message || "Failed to load pending orders");
        } finally {
            setLoading(false);
        }
    };

    const acceptOrder = async (order,orderId) => {
        setAcceptingOrderId(orderId);
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError("Please login to continue");
                return;
            }
            console.log(orderId)
            const response = await axios.post(`${Backend_url}/api/user/orders/accept`, {order, orderId}, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response?.data.success) {
                // Remove the accepted order from the pending list
                setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
                alert("Order accepted successfully!");
            } else {
                throw new Error(response.data.message || 'Failed to accept order');
            }
        } catch (err) {
            console.error("Error accepting order:", err);
            alert(err.response?.data?.message || err.message || "Failed to accept order");
        } finally {
            setAcceptingOrderId(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar cur_role='volunteer'/>
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Dashboard</h1>
                <p className="text-gray-600 mb-8">Find and accept book delivery requests in your area</p>
                
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Clock className="animate-spin h-8 w-8 text-blue-600 mr-2" />
                        <p className="text-gray-600">Loading pending delivery requests...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
                        <p>{error}</p>
                    </div>
                ) : pendingOrders.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 text-blue-600 p-8 rounded-md text-center">
                        <Truck className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-xl font-semibold mb-2">No Pending Orders</h3>
                        <p>There are currently no pending delivery requests. Check back later!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {pendingOrders.map(order => (
                            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="bg-blue-50 p-4 border-b">
                                    <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                                        <BookOpen className="mr-2 text-blue-600" size={20} />
                                        {order?.title}
                                    </h3>
                                    <div className="mt-1 text-sm text-gray-600">
                                        <p>Author: {order?.author}</p>
                                        <p>Publisher: {order?.publisher}</p>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="flex flex-col space-y-4">
                                        {/* Source Address */}
                                        <div className="flex items-start">
                                            <div className="bg-green-100 p-2 rounded-full mr-3">
                                                <MapPin className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Pickup From</p>
                                                <p className="text-gray-800">{order?.sourceAddress}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Destination Address */}
                                        <div className="flex items-start">
                                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                                <MapPin className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Deliver To</p>
                                                <p className="text-gray-800">{order?.destinationAddress}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Distance */}
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                                                <Navigation className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Distance</p>
                                                <p className="text-gray-800">
                                                    {order.distance < 1 
                                                        ? `${(order?.distance * 1000)} meters` 
                                                        : `${order?.distance} kilometers`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="w-full mt-6 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center disabled:bg-blue-300"
                                        onClick={() => acceptOrder(order,order._id)}
                                        disabled={acceptingOrderId === order._id}
                                    >
                                        {acceptingOrderId === order._id ? (
                                            <>Processing <Clock className="ml-2 h-4 w-4 animate-spin" /></>
                                        ) : (
                                            <>Accept Delivery <Check className="ml-2 h-4 w-4" /></>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};