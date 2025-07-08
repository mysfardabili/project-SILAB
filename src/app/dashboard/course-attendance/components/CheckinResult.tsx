import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { CheckinResult as CheckinResultType, ClassSession } from '@/types/attendance';

interface CheckinResultProps {
    result?: CheckinResultType | null;
    error?: string | null;
    selectedSession?: ClassSession | null;
}

const CheckinResult: React.FC<CheckinResultProps> = ({
    result,
    error,
    selectedSession
}) => {
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            </div>
        );
    }

    if (result && result.success) {
        return (
            <div className={`px-4 py-3 rounded-md text-sm ${
                result.status === "late" 
                    ? "bg-amber-50 border border-amber-200 text-amber-700" 
                    : "bg-green-50 border border-green-200 text-green-700"
            }`}>
                <div className="flex items-center gap-2 font-medium">
                    {result.status === "late" ? (
                        <Clock className="h-5 w-5" />
                    ) : (
                        <CheckCircle className="h-5 w-5" />
                    )}
                    {result.message}
                </div>
                {selectedSession && (
                    <div className="mt-2 text-xs">
                        Checked in at {result.timestamp} for {selectedSession.courseName}
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default CheckinResult;