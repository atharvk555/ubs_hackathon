import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Backend_url } from "../config";
import SearchResultsAction from "../components/SearchResultsAction";
import Navbar from "../components/Navbar";

export const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Getting search parameters from URL, matching the School_Dashboard structure
    const title = queryParams.get("title") || "";
    const author = queryParams.get("author") || "";
    const publisher = queryParams.get("publisher") || "";

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSearchResults = async () => {
            // Only fetch if at least one parameter is provided
            if (!title && !author && !publisher) {
                setBooks([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                // Creating request body as specified in your requirements
                const requestBody = {
                    Name: title || undefined,
                    Authors: author || undefined,
                    Publisher: publisher || undefined
                };
                
                // Using POST request since you're sending data in request body
                // const response = await axios.post(
                //     `${Backend_url}/api/school/get-books`, 
                //     requestBody,
                //     {
                //         headers: {
                //             Authorization: localStorage.getItem("token"),
                //             'Content-Type': 'application/json'
                //         }
                //     }
                // );
                
                // console.log("Search results:", response.data.books || response.data);
                setBooks([
                    {
                        _id: "1",
                        name: "The Great Gatsby",
                        authors: "F. Scott Fitzgerald",
                        publisher: "Scribner"
                    },
                    {
                        _id: "2",
                        name: "1984",
                        authors: "George Orwell",
                        publisher: "Secker & Warburg"
                    },
                    {
                        _id: "3",
                        name: "To Kill a Mockingbird",
                        authors: "Harper Lee",
                        publisher: "J.B. Lippincott & Co."
                    }
                ]);
                setLoading(false);

                // setBooks(response.data.books || []);
            } catch (err) {
                console.error("Failed to fetch search results:", err);
                setError("Failed to fetch search results. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [title, author, publisher]);

    // Handler for when a book is clicked
    const handleBookClick = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <>
            <Navbar cur_role='school'/>
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
                <div className="flex-grow container mx-auto px-4 py-8">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
                        <p className="text-gray-600 mt-1">
                            {title && `Title: "${title}"`} 
                            {author && (title ? ` • Author: "${author}"` : `Author: "${author}"`)}
                            {publisher && ((title || author) ? ` • Publisher: "${publisher}"` : `Publisher: "${publisher}"`)}
                        </p>
                    </div>

                    {loading ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600">Loading search results...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : books.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <p className="text-gray-600">No books found matching your search criteria.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <h2 className="text-lg font-semibold text-gray-800 p-4 border-b">
                                Found <span className="text-blue-600">{books.length}</span> books
                            </h2>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <th className="px-4 py-3">Book Name</th>
                                            <th className="px-4 py-3">Author</th>
                                            <th className="px-4 py-3">Publisher</th>
                                            <th className="px-4 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {books.map(book => (
                                            <tr key={book._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleBookClick(book._id)}>
                                                <td className="px-4 py-3 font-medium text-gray-800">{book.name}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600">{book.authors}</td>
                                                <td className="px-4 py-3 text-sm">{book.publisher}</td>
                                                <td className="px-4 py-3 text-right">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleBookClick(book._id);
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t">
                                <SearchResultsAction />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};