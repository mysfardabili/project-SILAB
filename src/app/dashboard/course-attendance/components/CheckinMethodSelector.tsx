import React from 'react';
import { School, MapPin, QrCode } from 'lucide-react';
import { CheckinMethod } from '@/types/attendance';

interface CheckinMethodSelectorProps {
    selectedMethod: CheckinMethod;
    onMethodChange: (method: CheckinMethod) => void;
}

const CheckinMethodSelector: React.FC<CheckinMethodSelectorProps> = ({
    selectedMethod,
    onMethodChange
}) => {
    const methods = [
        { key: 'code' as const, label: 'Class Code', icon: School },
        { key: 'location' as const, label: 'Location', icon: MapPin },
        { key: 'qr' as const, label: 'Scan QR', icon: QrCode }
    ];

    return (
        <div className="flex gap-3 mb-4">
            {methods.map(({ key, label, icon: Icon }) => (
                <button
                    key={key}
                    onClick={() => onMethodChange(key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 flex-1 justify-center ${
                        selectedMethod === key
                            ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                            : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                >
                    <Icon className="h-4 w-4" />
                    {label}
                </button>
            ))}
        </div>
    );
};

export default CheckinMethodSelector;