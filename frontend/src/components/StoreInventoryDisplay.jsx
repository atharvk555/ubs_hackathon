import React, { useRef } from 'react';
import { MapPin, Book, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StoreInventoryDisplay = ({ storeData }) => {
  const navigate = useNavigate();

  const handleRequestBook = (bookId, storeId) => {
    console.log(`Requesting book ${bookId} from store ${storeId}`);
  };

  const renderConditionStars = (condition) => {
    // Change from 10 stars to 5 stars for better UI
    const maxStars = 5;
    // Convert the 10-scale to 5-scale
    const filledStars = Math.round((Math.min(Math.max(condition, 0), 10) / 10) * maxStars);
    
    return (
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => (
          <Star 
            key={index} 
            size={12} // Reduced star size
            className={index < filledStars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"} 
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">{condition}/10</span>
      </div>
    );
  };

  if (!storeData || storeData.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No stores found with this book in inventory.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Stores</h2>
      
      {storeData.map((store) => {
        const scrollRef = useRef(null);

        const scrollLeft = () => {
          if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
          }
        };

        const scrollRight = () => {
          if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
          }
        };

        return (
          <div key={store._id} className="bg-white rounded-lg shadow-md mb-8 overflow-hidden">
            <div className="bg-blue-50 p-4 border-b">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    <MapPin className="inline-block mr-2 text-blue-600" size={20} />
                    Store Location
                  </h3>
                  <p className="text-gray-600 mt-1">{store.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="text-lg font-medium text-blue-600">
                    {store.distance < 1 
                      ? `${(store.distance * 1000).toFixed(0)} m` 
                      : `${store.distance.toFixed(2)} ${store.distanceUnit || 'km'}`}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Inventory - Horizontal Scroll */}
            <div className="relative p-4">
              <h4 className="text-lg font-medium text-gray-700 mb-4">
                <Book className="inline-block mr-2 text-blue-600" size={18} />
                Available Books
              </h4>
              
              {/* Scroll Buttons */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900 z-10"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Scrollable Books Container */}
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-8"
                style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
              >
                {store.inventory.map((item) => (
                  <div 
                    key={item._id} 
                    className="min-w-[220px] bg-white border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col items-center justify-between h-[300px]"
                  >
                    {/* Book Image */}
                    <div className="mb-2 w-full h-[120px] flex items-center justify-center">
                      {item.images && item.images.startsWith('http') ? (
                        <img 
                          src={item.images} 
                          alt="Book cover" 
                          className="w-full h-full object-contain rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                          <Book size={48} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Book Details */}
                    <div className="w-full text-center">
                      <div className="mb-1">
                        <span className="text-sm font-medium text-gray-500 mr-1">Condition:</span>
                        {renderConditionStars(item.condition)}
                      </div>
                      
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-sm font-medium text-gray-500 mr-1">Copies:</span>
                        <span className="text-gray-700">{item.numberOfCopies} available</span>
                      </div>
                    </div>
                    
                    {/* Request Button */}
                    <button 
                      onClick={() => handleRequestBook(item.book, store._id)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
                    >
                      Request Book <Check className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900 z-10"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};