// course-attendance/components/CheckinButton.tsx
import React from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

interface CheckinButtonProps {
    isLoading: boolean;
    disabled: boolean;
    onClick: () => void;
}

const CheckinButton: React.FC<CheckinButtonProps> = ({
    isLoading,
    disabled,
    onClick
}) => {
    return (
        <button
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onClick}
            disabled={disabled}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <CheckCircle className="h-4 w-4" />
                    Check-in Now
                </>
            )}
        </button>
    );
};

export default CheckinButton;