import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchResultsAction = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            Didn't find what you were looking for?
          </h3>
          <p className="text-yellow-700 mb-4">
            You can make a request if we find a donor then we will reach you soon.    
        </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => navigate('/request')}
              className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-200 text-center"
            >
              Request Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsAction;