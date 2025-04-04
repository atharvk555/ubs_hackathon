import { useState } from "react";
import axios from "axios";
import { Backend_url } from "../config";
import Navbar from "../components/Navbar";
import { Book, Send, AlertCircle } from "lucide-react";

export const Request = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    quantity: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Form validation
    if (!formData.title.trim()) {
      setError("Book title is required");
      return;
    }
    
    if (formData.quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.post(
        `${Backend_url}/api/user/getEmailToDonor`,
        {
          title: formData.title,
          author: formData.author,
          publisher: formData.publisher,
          quantity: formData.quantity
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json"
          }
        }
      );
      
      console.log("Book request submitted:", response.data);
      setSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: "",
        author: "",
        publisher: "",
        quantity: 1
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (err) {
      console.error("Failed to submit book request:", err);
      setError(err.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar cur_role="school" />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-800">Request New Books</h1>
              <p className="text-gray-600 mt-2">
                Couldn't find the book you need? Submit a request and we'll help you get it.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 p-4 flex items-center">
                <Book className="h-6 w-6 text-white mr-2" />
                <h2 className="text-xl font-semibold text-white">Book Request Form</h2>
              </div>
              
              {success && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">
                      Your book request has been successfully submitted! We'll process your request soon.
                    </p>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Book Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter book title"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter author name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="publisher" className="block text-sm font-medium text-gray-700 mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter publisher name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Request
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="bg-gray-50 p-4 border-t">
                <div className="text-sm text-gray-600">
                  <p><span className="font-semibold">Note:</span> Your request will be reviewed by our team. Once approved, you'll receive a notification and can track the status from your dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};