import React, { useEffect, useState } from 'react';
import { Book, Upload, Check, AlertCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { Backend_url } from '../config';

export const Donor_Dashboard = () => {
    const [formData, setFormData] = useState({
        book_title: '',
        author_name: '',
        grade: '',
        publisher: '',
        book_image: null,
        condition: 5,
        quantity: 1
    });

    const [preview, setPreview] = useState(null);
    const [mediaFile, setMediaFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // setFormData({
            //     ...formData,
            //     book_image: file
            // });
            setMediaFile(file);

            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToS3 = async (file) => {
        try {
            // Get presigned URL from server
            const urlResponse = await axios.post(`${Backend_url}/api/s3/get-upload-url`, {
                fileName: file.name,
                fileType: file.type
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            const { presignedUrl, fileUrl } = urlResponse.data;

            // Upload file directly to S3 using the presigned URL
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });

            return fileUrl;
        } catch (error) {
            console.error("Error uploading to S3:", error);
            throw new Error("Failed to upload file");
        }
    };

    useEffect(() => {
        console.log("Updated formData:", formData);
    }, [formData]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const res = await uploadToS3(mediaFile);
            setFormData((prevData) => ({
                ...prevData,
                book_image: res
            }));
    
            // Wait for state update before submitting
            const response=axios.post(`${Backend_url}/api/donor/add_book`,formData,{
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            });

            setTimeout(() => {
                console.log('Book donation submitted:', formData);
                setIsSubmitting(false);
                setSubmitSuccess(true);
            }, 500);
        } catch (error) {
            console.error("Error submitting:", error);
            setIsSubmitting(false);
        }
    };

    
    const gradeOptions = [
        'Pre-school', 'Kindergarten',
        'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
        'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
        'Grade 11', 'Grade 12'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <Navbar cur_role='donor' />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
                    <div className="flex items-center text-blue-600">
                        <Book className="h-5 w-5 mr-2" />
                        <span className="font-medium">Donate Your Books</span>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <Book className="h-6 w-6 mr-2 text-blue-600" />
                        Book Donation Form
                    </h2>

                    {submitSuccess ? (
                        <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center mb-6">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <p className="text-green-700">Book donation submitted successfully! Thank you for your contribution.</p>
                        </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="book_title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Book Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="book_title"
                                        name="book_title"
                                        value={formData.book_title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Author Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="author_name"
                                        name="author_name"
                                        value={formData.author_name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
                                        Grade/Class Level *
                                    </label>
                                    <select
                                        id="grade"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Select Grade</option>
                                        {gradeOptions.map((grade) => (
                                            <option key={grade} value={grade}>{grade}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
                                        Publisher *
                                    </label>
                                    <input
                                        type="text"
                                        id="publisher"
                                        name="publisher"
                                        value={formData.publisher}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="book_image" className="block text-sm font-medium text-gray-700 mb-1">
                                        Book Image *
                                    </label>
                                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 h-48 relative cursor-pointer">
                                        {preview ? (
                                            <div className="relative w-full h-full">
                                                <img src={preview} alt="Book preview" className="w-full h-full object-contain" />
                                                <button
                                                    type="button"
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreview(null);
                                                        setFormData({ ...formData, book_image: null });
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <label htmlFor="book_image" className="text-center cursor-pointer">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <p className="mt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                                            </label>
                                        )}
                                        <input
                                            type="file"
                                            id="book_image"
                                            name="book_image"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            required
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                                        Book Condition (1-10) *
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="range"
                                            id="condition"
                                            name="condition"
                                            min="1"
                                            max="10"
                                            value={formData.condition}
                                            onChange={handleInputChange}
                                            className="w-full mr-4"
                                            required
                                        />
                                        <span className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-md">
                                            {formData.condition}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Poor</span>
                                        <span>Average</span>
                                        <span>Excellent</span>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                        Quantity *
                                    </label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        name="quantity"
                                        min="1"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-4">
                            <AlertCircle className="h-4 w-4 mr-2 text-blue-600" />
                            <p>Fields marked with * are required</p>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Book className="mr-2 h-5 w-5" />
                                        Donate Book
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Donation Impact</h3>
                    <p className="text-gray-600 mb-4">
                        Your books will make a difference! Every donation helps students access the resources they need for a better education.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-blue-600 text-2xl font-bold">10</p>
                            <p className="text-sm text-gray-600">Your Donations</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-blue-600 text-2xl font-bold">3</p>
                            <p className="text-sm text-gray-600">Schools Reached</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-blue-600 text-2xl font-bold">45</p>
                            <p className="text-sm text-gray-600">Students Impacted</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <p className="text-blue-600 text-2xl font-bold">2</p>
                            <p className="text-sm text-gray-600">Pending Pickups</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};