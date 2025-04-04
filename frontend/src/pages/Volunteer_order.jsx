import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { BookOpen, MapPin, Check, X, AlertTriangle, Clock, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { Backend_url } from '../config';

export const Volunteer_order = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [processingOrderId, setProcessingOrderId] = useState(null);
    const [confirmOrderId,setOrderId]=useState();
    // For OTP modal
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState(null);
    const [otp, setOtp] = useState('');
    const [dest_email,setDest_email]=useState('');
    const [otpError, setOtpError] = useState('');
    
    // For cancellation reason modal
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');
    const [EMAIL,setEmail]=useState();
    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        setLoading(true);
        
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError("Please login to continue");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${Backend_url}/api/user/volunteer/my-orders`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data.information);
            setMyOrders(response.data.information || []);
        } catch (err) {
            console.error("Error fetching my orders:", err);
            setError(err.response?.data?.message || err.message || "Failed to load your orders");
        } finally {
            setLoading(false);
        }
    };

    const openOtpModal = (orderId) => {
        setCurrentOrderId(orderId);
        setOtp('');
        setOtpError('');
        setShowOtpModal(true);
    };

    const openCancelModal = (orderId) => {
        setCurrentOrderId(orderId);
        setCancelReason('');
        setShowCancelModal(true);
    };


    const handleCancelDelivery = async () => {
        if (!cancelReason.trim()) {
            alert('Please provide a reason for cancellation');
            return;
        }
        
        setProcessingOrderId(currentOrderId);
        
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError("Please login to continue");
                return;
            }

            const response = await axios.post(`${Backend_url}/api/orders/cancel/${currentOrderId}`, 
                { reason: cancelReason },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            if (response.data.success) {
                // Remove the cancelled order from the list
                setMyOrders(myOrders.filter(order => order._id !== currentOrderId));
                setShowCancelModal(false);
                alert("Delivery marked as unable to complete!");
            } else {
                throw new Error(response.data.message || 'Failed to cancel order');
            }
        } catch (err) {
            console.error("Error cancelling order:", err);
            alert(err.response?.data?.message || err.message || "Failed to cancel delivery");
        } finally {
            setProcessingOrderId(null);
        }
    };
    async function generateOTP(address){
        try{
            const response = await axios.post(`${Backend_url}/api/volunteer/generate_otp`,{address});
            console.log(response);
            setEmail(response?.data?.details?.destination);
        }
        catch(err){
            console.log(err.message);
        }
    }
    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };

    const handleCompleteDelivery= async()=>{
        try{
            // const response=await axios
            const response = await axios.post(`${Backend_url}/api/volunteer/verify_otp`,{email:EMAIL,otp:otp});
            if(response?.data.success){
                alert(response?.data?.message);
                console.log(confirmOrderId)
                const res = await axios.post(`${Backend_url}/api/volunteer/change_order_status`,{confirmOrderId});
            }
            else{
                alert("Invalid OTP");
            }
            console.log(response);
        }
        catch(err){
            alert("Invalid OTP");
            console.log(err.message);
        }
    }

    return (
        <>
            <Navbar cur_role='volunteer'/>
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Assigned Deliveries</h1>
                <p className="text-gray-600 mb-8">Manage your current book delivery assignments</p>
                
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Clock className="animate-spin h-8 w-8 text-blue-600 mr-2" />
                        <p className="text-gray-600">Loading your assigned deliveries...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
                        <p>{error}</p>
                    </div>
                ) : myOrders.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 text-blue-600 p-8 rounded-md text-center">
                        <Check className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                        <h3 className="text-xl font-semibold mb-2">No Active Deliveries</h3>
                        <p>You don't have any active delivery assignments. Visit the dashboard to find new delivery requests!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {myOrders.map(order => (
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
                                                <p className="text-gray-800">{order.sourceAddress}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Destination Address */}
                                        <div className="flex items-start">
                                            <div className="bg-red-100 p-2 rounded-full mr-3">
                                                <MapPin className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Deliver To</p>
                                                <p className="text-gray-800">{order.destinationAddress}</p>
                                                {/* <p className="mt-1 text-sm text-gray-600">
                                                    <span className="font-medium">Receiver:</span> {order.receiverName}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium">Phone:</span> {order.receiverPhone}
                                                </p> */}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                        <button 
                                            className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center disabled:bg-green-300"
                                            onClick={() => {generateOTP(order.destinationAddress),setOrderId(order._id);openOtpModal(order._id)}}
                                            disabled={processingOrderId === order._id}
                                        >
                                            <Check className="mr-2 h-5 w-5" />
                                            Mark as Delivered
                                        </button>
                                        
                                        <button 
                                            className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center disabled:bg-red-300"
                                            onClick={() => {openCancelModal(order._id),setDest_email(order.destinationAddress)}}
                                            disabled={processingOrderId === order._id}
                                        >
                                            <X className="mr-2 h-5 w-5" />
                                            Unable to Deliver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* OTP Verification Modal */}
            {showOtpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Verify Delivery</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowOtpModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex items-center mb-4 text-blue-600">
                                <ShieldCheck className="mr-2 h-5 w-5" />
                                <p className="font-medium">Enter the 6-digit OTP provided by the recipient</p>
                            </div>
                            
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => {
                                    setOtp(e.target.value);
                                    setOtpError('');
                                }}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                maxLength={6}
                            />
                            
                            {otpError && (
                                <p className="mt-2 text-sm text-red-600">{otpError}</p>
                            )}
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                onClick={() => setShowOtpModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 flex items-center"
                                onClick={()=>{handleCompleteDelivery()}}
                                disabled={processingOrderId !== null}
                            >
                                {processingOrderId ? (
                                    <>
                                        Verifying
                                        <Clock className="ml-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    "Confirm Delivery"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Cancellation Reason Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Unable to Complete Delivery</h3>
                            <button 
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowCancelModal(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <div className="flex items-center mb-4 text-amber-600">
                                <AlertTriangle className="mr-2 h-5 w-5" />
                                <p className="font-medium">Please explain why the delivery cannot be completed</p>
                            </div>
                            
                            <textarea
                                placeholder="Describe the issue (e.g., damaged book, recipient not available)"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            ></textarea>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                onClick={() => setShowCancelModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300 flex items-center"
                                onClick={handleCancelDelivery}
                                disabled={processingOrderId !== null}
                            >
                                {processingOrderId ? (
                                    <>
                                        Processing
                                        <Clock className="ml-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};