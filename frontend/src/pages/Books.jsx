import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreInventoryDisplay } from '../components/StoreInventoryDisplay';
import { Navbar } from '../components/Navbar';
import { Backend_url } from '../config';

export const Books = () => {
    const { id } = useParams();
    const [storeData] = useState([
        {
          _id: "67ee5c689918d6f1f17b1ac9",
          address: "Vadgoan Pune, Maharashtra",
          latitude: 18.552477725130302,
          longitude: 73.95322689565462,
          inventory: [
            {
              _id: "67ee6762603cbf524ebe7fe3",
              book: "67ee623fe40cdd5eee96495e",
              numberOfCopies: 10,
              condition: 9,
              images: "abc",
              addedBy: "67ee4ba442dfbac45ec7dcef",
            },
            {
              _id: "67ee86af30e3fb39709499c4",
              book: "67ee86af30e3fb39709499c1",
              numberOfCopies: 3,
              condition: 8,
              images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
              addedBy: "67ee4ba442dfbac45ec7dcef",
            },
            {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
          ],
          distance: 5436.28,
          distanceUnit: "km",
        },
        {
            _id: "67ee5c689918d6f1f17b1ac9",
            address: "Vadgoan Pune, Maharashtra",
            latitude: 18.552477725130302,
            longitude: 73.95322689565462,
            inventory: [
              {
                _id: "67ee6762603cbf524ebe7fe3",
                book: "67ee623fe40cdd5eee96495e",
                numberOfCopies: 10,
                condition: 9,
                images: "abc",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                _id: "67ee86af30e3fb39709499c4",
                book: "67ee86af30e3fb39709499c1",
                numberOfCopies: 3,
                condition: 8,
                images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                addedBy: "67ee4ba442dfbac45ec7dcef",
              },
              {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
                {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
                {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
                {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
                {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
                {
                  _id: "67ee86af30e3fb39709499c4",
                  book: "67ee86af30e3fb39709499c1",
                  numberOfCopies: 3,
                  condition: 8,
                  images: "https://books4all.s3.amazonaws.com/uploads/1743685248047-pin.png",
                  addedBy: "67ee4ba442dfbac45ec7dcef",
                },
            ],
            distance: 5436.28,
            distanceUnit: "km",
          },
      ]);
    
    // const [storeData, setStoreData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     // Get user's location - you could use a location library instead
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             const { latitude, longitude } = position.coords;
    //             fetchStores(id, latitude, longitude);
    //         },
    //         (error) => {
    //             console.error("Error getting location:", error);
    //             // Fallback coordinates or error handling
    //             fetchStores(id, 18.55, 73.95); // Default coordinates
    //         }
    //     );
    // }, [id]);

    // const fetchStores = async (bookId, lat, lng) => {
    //     try {
    //         const response = await fetch(`${Backend_url}/api/books/${bookId}?lat=${lat}&lng=${lng}`);
    //         const data = await response.json();
            
    //         if (data.success) {
    //             setStoreData(data.stores);
    //         } else {
    //             setError("Failed to fetch store data");
    //         }
    //     } catch (err) {
    //         setError("Error connecting to server");
    //         console.error(err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <Navbar cur_role='user' />
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Availability</h1>
                
                {loading ? (
                    <div className="text-center py-12">
                        <p>Loading available stores...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-600 p-4 rounded-md">
                        <p>{error}</p>
                    </div>
                ) : (
                    <StoreInventoryDisplay storeData={storeData} />
                )}
            </div>
        </div>
    );
};