import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
    currentLocation?: string;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ 
    currentLocation = "Campus Center" 
}) => {
    return (
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
            <div className="flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-sm text-center text-gray-600">
                Your location will be used to verify you are in the correct classroom.
            </p>
            <div className="flex justify-center mt-2">
                <div className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-500 border border-gray-200">
                    Current location: {currentLocation}
                </div>
            </div>
        </div>
    );
};

export default LocationDisplay;