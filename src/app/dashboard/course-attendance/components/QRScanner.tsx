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
                <div className="flex flex-col items-center w-full">
                    <div className="relative w-full max-w-sm aspect-square bg-black rounded-xl overflow-hidden mb-4 shadow-inner">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-white/20 animate-pulse" />
                        </div>
                        {/* Overlay frame for scanner */}
                        <div className="absolute inset-x-8 inset-y-8 border-2 border-dashed border-white/50 rounded-lg">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500 rounded-tl-sm -mt-0.5 -ml-0.5"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500 rounded-tr-sm -mt-0.5 -mr-0.5"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500 rounded-bl-sm -mb-0.5 -ml-0.5"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500 rounded-br-sm -mb-0.5 -mr-0.5"></div>
                            {/* Scanning line animation */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-4 text-center">Arahkan kamera ke QR Code kelas</p>
                    <div className="flex justify-center w-full">
                        <button
                            className="text-sm text-indigo-600 font-medium hover:text-indigo-800 underline transition-colors"
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