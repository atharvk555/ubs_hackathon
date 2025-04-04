import React, { useState, useEffect } from 'react';
import { 
  Search, Book, Calendar, Users, Bell, BookOpen, 
  CheckCircle, Clock, Package, ArrowRight, Download 
} from "lucide-react";
import { Navbar } from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Backend_url } from '../config';
export const School_Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Search states - keeping the existing search logic
  const [titleQuery, setTitleQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [publisherQuery, setPublisherQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  // const [allRequests,setAllRequests]=useState([]);
  // Changed the activeTab to start with "pending" instead of "available"
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingRequests,setPending]=useState([]);
  const [approvedRequests,setAccepted]=useState([]);
  const [completedRequests,setDelivered]=useState([]);
  async function getAllRequests(){
    try{
      const response=await axios.post(`${Backend_url}/api/school/get_all_requests`,{},{
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      // console.log(response?.data?.inventory);
      // setAllRequests(response?.data?.inventory);
      const allRequests=response?.data?.inventory;
      console.log(allRequests);
      const pendingRequests = allRequests.filter(req => req.status === "pending"||req.status === "Pending");
      const acceptedRequests = allRequests.filter(req => req.status === "approved"||req.status === "Approved");
      const deliveredRequests = allRequests.filter(req => req.status === "complete"||req.status === "Completed");
  
      setPending(pendingRequests);
      setAccepted(acceptedRequests);
      setDelivered(deliveredRequests);
      // console.log(response);
    }
    catch(err){
      console.log(err);
    }
  }
  // useEffect(()=>{
  //   const pendingRequests = allRequests.filter(req => req.status === "pending");
  //   const acceptedRequests = allRequests.filter(req => req.status === "approved");
  //   const deliveredRequests = allRequests.filter(req => req.status === "complete");

  //   setPending(pendingRequests);
  //   setAccepted(acceptedRequests);
  //   setDelivered(deliveredRequests);
  // },[allRequests])

  // console.log(pendingRequests,approvedRequests,completedRequests)
  // Parse URL params on component mount
  useEffect(() => {
    getAllRequests();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');
    const author = searchParams.get('author');
    const publisher = searchParams.get('publisher');
    
    if (title) setTitleQuery(title);
    if (author) setAuthorQuery(author);
    if (publisher) setPublisherQuery(publisher);
  }, [location.search]);
  
  // Sample data for the requests based on status
  // This would be replaced by actual API calls to your backend

  // const pendingRequests = [
  //   { id: 101, name: "Introduction to Chemistry", authors: "Raymond Chang", publisher: "McGraw-Hill", quantity: 5, status: "Pending", request_Date: "Mar 25, 2025" },
  //   { id: 102, name: "World History: Modern Times", authors: "Jackson J. Spielvogel", publisher: "Cengage Learning", quantity: 10, status: "Pending", request_Date: "Mar 22, 2025" },
  //   { id: 104, name: "The Great Gatsby", authors: "F. Scott Fitzgerald", publisher: "Scribner", quantity: 15, status: "Pending", request_Date: "Mar 28, 2025" },
  // ];
  
  // const approvedRequests = [
  //   { id: 201, name: "Elementary Statistics", authors: "Mario F. Triola", publisher: "Pearson", quantity: 8, status: "Approved", request_Date: "Mar 18, 2025" },
  //   { id: 202, name: "Biology: Concepts and Applications", authors: "Cecie Starr", publisher: "Cengage Learning", quantity: 12, status: "Approved", request_Date: "Mar 15, 2025" },
  // ];
  
  // const completedRequests = [
  //   { id: 301, name: "Romeo and Juliet", authors: "William Shakespeare", publisher: "Folger", quantity: 20, status: "Completed", request_Date: "Mar 10, 2025" },
  //   { id: 302, name: "Mathematics for Elementary Teachers", authors: "Sybilla Beckmann", publisher: "Pearson", quantity: 6, status: "Completed", request_Date: "Feb 28, 2025" },
  //   { id: 303, name: "Wonder", authors: "R.J. Palacio", publisher: "Knopf Books", quantity: 15, status: "Completed", request_Date: "Mar 05, 2025" },
  // ];
  
  // Keeping the search function the same as it redirects to a new URL
  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validate at least one field has a value
    if (!titleQuery.trim() && !authorQuery.trim() && !publisherQuery.trim()) {
      setSearchError("At least one search field is required");
      return;
    }
    
    setSearchError("");
    
    // Build search query params
    const searchParams = new URLSearchParams();
    if (titleQuery.trim()) searchParams.append('title', titleQuery.trim());
    if (authorQuery.trim()) searchParams.append('author', authorQuery.trim());
    if (publisherQuery.trim()) searchParams.append('publisher', publisherQuery.trim());
    
    // Navigate with search params
    navigate(`/search?${searchParams.toString()}`);
    
    // For demo purposes, log the search criteria
    console.log("Searching for:", {
      title: titleQuery.trim() || null,
      author: authorQuery.trim() || null,
      publisher: publisherQuery.trim() || null
    });
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  
  const clearSearch = () => {
    setTitleQuery("");
    setAuthorQuery("");
    setPublisherQuery("");
    setSearchError("");
  };
  
  // Status color function
  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Approved": return "bg-green-100 text-green-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <Navbar cur_role='school' />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">School Dashboard</h1>
            <p className="text-gray-600 mt-1">St. Mary's High School, Mumbai</p>
          </div>
          
          {/* Notifications */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">3</span>
            </button>
            <div className="w-px bg-gray-300"></div>
            <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center" onClick={()=>{
                navigate('/request')
            }}>
              <Book className="h-5 w-5 mr-2" />
              Request Books
            </button>
          </div>
        </div>
        
        {/* Search and stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative">
                    <label htmlFor="titleSearch" className="block text-xs font-medium text-gray-700 mb-1">
                      Title <span className="text-gray-400">(at least one field required)</span>
                    </label>
                    <div className="relative">
                      <input 
                        id="titleSearch"
                        type="text" 
                        className="block w-full p-3 pl-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        placeholder="Search by title..." 
                        value={titleQuery}
                        onChange={(e) => setTitleQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="authorSearch" className="block text-xs font-medium text-gray-700 mb-1">
                      Author
                    </label>
                    <div className="relative">
                      <input 
                        id="authorSearch"
                        type="text" 
                        className="block w-full p-3 pl-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        placeholder="Search by author..." 
                        value={authorQuery}
                        onChange={(e) => setAuthorQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="publisherSearch" className="block text-xs font-medium text-gray-700 mb-1">
                      Publisher
                    </label>
                    <div className="relative">
                      <input 
                        id="publisherSearch"
                        type="text" 
                        className="block w-full p-3 pl-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        placeholder="Search by publisher..." 
                        value={publisherQuery}
                        onChange={(e) => setPublisherQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                </div>
                
                {searchError && (
                  <div className="mt-2 text-red-600 text-sm">{searchError}</div>
                )}
                
                <div className="flex justify-end gap-2 mt-3">
                  <button 
                    type="button" 
                    onClick={clearSearch}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Clear
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search Books
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md flex flex-col justify-center">
            <h2 className="text-lg font-semibold mb-2">Your Request Summary</h2>
            <div className="flex items-center justify-between mt-2">
              <div>
                <p className="text-3xl font-bold">{pendingRequests.length}</p>
                <p className="text-sm opacity-90">Pending</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{approvedRequests.length}</p>
                <p className="text-sm opacity-90">Approved</p>
              </div>
              <div>
                <p className="text-3xl font-bold">{completedRequests.length}</p>
                <p className="text-sm opacity-90">Completed</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content - Book Requests with status-based tabs */}
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b">
              <div className="flex">
                <button
                  className={`px-4 py-3 font-medium ${activeTab === "pending" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                  onClick={() => setActiveTab("pending")}
                >
                  Pending Requests
                </button>
                <button
                  className={`px-4 py-3 font-medium ${activeTab === "approved" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                  onClick={() => setActiveTab("approved")}
                >
                  Approved Requests
                </button>
                <button
                  className={`px-4 py-3 font-medium ${activeTab === "completed" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed Requests
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {activeTab === "pending" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Pending Book Requests <span className="text-blue-600">({pendingRequests.length})</span>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="px-4 py-3">Book Name</th>
                          <th className="px-4 py-3">Authors</th>
                          <th className="px-4 py-3">Publisher</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3">Request Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pendingRequests.map(request => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">{request.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{request.authors}</td>
                            <td className="px-4 py-3 text-sm">{request.publisher}</td>
                            <td className="px-4 py-3 text-sm">{request.quantity}</td>
                            <td className="px-4 py-3 text-sm">{request.request_Date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === "approved" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Approved Book Requests <span className="text-blue-600">({approvedRequests.length})</span>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="px-4 py-3">Book Name</th>
                          <th className="px-4 py-3">Authors</th>
                          <th className="px-4 py-3">Publisher</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3">Request Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {approvedRequests.map(request => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">{request.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{request.authors}</td>
                            <td className="px-4 py-3 text-sm">{request.publisher}</td>
                            <td className="px-4 py-3 text-sm">{request.quantity}</td>
                            <td className="px-4 py-3 text-sm">{request.request_Date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Track Delivery
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === "completed" && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Completed Book Requests <span className="text-blue-600">({completedRequests.length})</span>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          <th className="px-4 py-3">Book Name</th>
                          <th className="px-4 py-3">Authors</th>
                          <th className="px-4 py-3">Publisher</th>
                          <th className="px-4 py-3">Quantity</th>
                          <th className="px-4 py-3">Request Date</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {completedRequests.map(request => (
                          <tr key={request.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">{request.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{request.authors}</td>
                            <td className="px-4 py-3 text-sm">{request.publisher}</td>
                            <td className="px-4 py-3 text-sm">{request.quantity}</td>
                            <td className="px-4 py-3 text-sm">{request.request_Date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Generate Report
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};