// course-attendance/components/QRScanner.tsx
import React from 'react';
import { QrCode } from 'lucide-react';

interface QRScannerProps {
    showCamera: boolean;
    onOpenCamera: () => void;
    onScanComplete: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({
    showCamera,
    onOpenCamera,
    onScanComplete
}) => {
    return (
        <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
            {showCamera ? (
                <div>
                    <div className="bg-black rounded-md h-48 flex items-center justify-center mb-2">
                        <div className="text-white text-sm">Camera feed</div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="text-xs text-gray-500 underline"
                            onClick={onScanComplete}
                        >
                            Simulate successful scan
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <QrCode className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-center text-gray-600">
                        Scan the QR code displayed by your instructor
                    </p>
                    <button
                        onClick={onOpenCamera}
                        className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium"
                    >
                        Open Camera
                    </button>
                </div>
            )}
        </div>
    );
};

export default QRScanner;