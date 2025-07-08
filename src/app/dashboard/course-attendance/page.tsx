"use client";

import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { ClassSession, CheckinResult, CheckinMethod } from '@/types/attendance';
import {
    ClassSessionCard,
    CheckinMethodSelector,
    CodeInput,
    LocationDisplay,
    QRScanner,
    CheckinResult as CheckinResultComponent,
    CheckinButton
} from './components';

// Mock current class sessions
const mockAvailableSessions: ClassSession[] = [
    {
        id: "1",
        course: "CSE101",
        courseName: "Web Technology",
        instructor: "Dr. Emily Chen",
        room: "Tech Building 305",
        startTime: "9:00 AM",
        endTime: "10:30 AM",
        date: "April 20, 2025",
        active: true
    },
    {
        id: "2",
        course: "CSE202",
        courseName: "Data Structures",
        instructor: "Prof. James Rodriguez",
        room: "Science Hall 210",
        startTime: "2:00 PM",
        endTime: "3:30 PM",
        date: "April 20, 2025",
        active: true
    }
];

const StudentCheckIn = () => {
    const [availableSessions, setAvailableSessions] = useState<ClassSession[]>(mockAvailableSessions);
    const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);
    const [checkinCode, setCheckinCode] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<CheckinResult | null>(null);
    const [checkinMethod, setCheckinMethod] = useState<CheckinMethod>("code");
    const [error, setError] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState<boolean>(false);

    // Auto-select session if only one available
    useEffect(() => {
        if (availableSessions.length === 1) {
            setSelectedSession(availableSessions[0]);
        }
    }, [availableSessions]);

    const handleSessionSelect = (session: ClassSession) => {
        setSelectedSession(session);
        setResult(null);
        setError(null);
    };

    const handleCheckinMethodChange = (method: CheckinMethod) => {
        setCheckinMethod(method);
        setResult(null);
        setError(null);
        setShowCamera(method === "qr");
    };

    const handleCheckin = async () => {
        if (!selectedSession) {
            setError("Please select a class session");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (checkinMethod === "code" && checkinCode.length === 0) {
                setError("Invalid check-in code");
                setIsLoading(false);
                return;
            }

            // Determine if student is late based on current time vs class start time
            const currentHour = new Date().getHours();
            const isLate = currentHour >= 9; // Mock condition

            // Check-in success
            setResult({
                success: true,
                message: isLate ? "You've been marked as late" : "You've been marked as present",
                timestamp: new Date().toLocaleTimeString(),
                status: isLate ? "late" : "present"
            });
        } catch (err) {
            setError("Failed to check in. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleQrCodeScanned = () => {
        setShowCamera(false);
        setIsLoading(true);

        // Simulate processing
        setTimeout(() => {
            setIsLoading(false);
            setResult({
                success: true,
                message: "QR code scanned successfully. You've been marked as present",
                timestamp: new Date().toLocaleTimeString(),
                status: "present"
            });
        }, 1500);
    };

    const shouldShowCheckinButton = selectedSession && (checkinMethod !== "qr" || !showCamera);
    const isButtonDisabled = isLoading || (checkinMethod === "code" && !checkinCode);

    return (
        <div className="mt-6 rounded-lg bg-white overflow-hidden h-full py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">
                        Check-in Attendance
                    </h3>
                </div>
            </div>
            <Separator className="my-2" />

            <div className="px-6 py-4 space-y-6">
                {/* Step 1: Select Class */}
                <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-3">
                        1. Select Available Class
                    </h4>

                    {availableSessions.length > 0 ? (
                        <div className="space-y-2">
                            {availableSessions.map((session) => (
                                <ClassSessionCard
                                    key={session.id}
                                    session={session}
                                    isSelected={selectedSession?.id === session.id}
                                    onSelect={handleSessionSelect}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
                            <AlertCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">
                                No active classes available for check-in at the moment
                            </p>
                        </div>
                    )}
                </div>

                {/* Step 2: Choose Check-in Method */}
                {selectedSession && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-3">
                            2. Choose Check-in Method
                        </h4>

                        <CheckinMethodSelector
                            selectedMethod={checkinMethod}
                            onMethodChange={handleCheckinMethodChange}
                        />

                        {/* Check-in Method Specific Content */}
                        <div className="mt-4">
                            {checkinMethod === "code" && (
                                <CodeInput
                                    value={checkinCode}
                                    onChange={setCheckinCode}
                                />
                            )}

                            {checkinMethod === "location" && (
                                <LocationDisplay />
                            )}

                            {checkinMethod === "qr" && (
                                <QRScanner
                                    showCamera={showCamera}
                                    onOpenCamera={() => setShowCamera(true)}
                                    onScanComplete={handleQrCodeScanned}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Check-in Button */}
                {shouldShowCheckinButton && (
                    <CheckinButton
                        isLoading={isLoading}
                        disabled={isButtonDisabled}
                        onClick={handleCheckin}
                    />
                )}

                {/* Result Messages */}
                <CheckinResultComponent
                    result={result}
                    error={error}
                    selectedSession={selectedSession}
                />

                {/* Link to attendance history */}
                <div className="pt-2">
                    <Link
                        href="/dashboard/attendance"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        View my attendance history
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentCheckIn;