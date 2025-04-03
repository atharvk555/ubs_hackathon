import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StoreInventoryDisplay } from '../components/StoreInventoryDisplay';
import { Navbar } from '../components/Navbar';
import { Backend_url } from '../config';
import axios from 'axios';

export const Books = () => {
    const { id } = useParams();
    const [storeData, setStoreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocationAndStores = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    console.log({ latitude, longitude });
                    fetchStores(id, latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    fetchStores(id, 18.55, 73.95); // Default location if permission denied
                }
            );
        };

        fetchLocationAndStores();
    }, [id]);

    const fetchStores = async (bookId, lat, lng) => {
        try {
            setLoading(true);
            const response = await axios.post(`${Backend_url}/api/school/search_in_store`, { bookId, lat, long: lng });
            const data = response.data;
            console.log(data)
            if (data.success) {
                setStoreData(data.stores);
            } else {
                setError("Failed to fetch store data");
            }
        } catch (err) {
            setError("Error connecting to server");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
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
                ) : storeData.length > 0 ? (
                    <StoreInventoryDisplay storeData={storeData} />
                ) : (
                    <div className="text-center py-12">
                        <p>No stores found with the requested book.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
