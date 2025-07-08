// course-attendance/components/ClassSessionCard.tsx
import React from 'react';
import { Clock, MapPin, User } from 'lucide-react';
import { ClassSession } from '@/types/attendance';

interface ClassSessionCardProps {
    session: ClassSession;
    isSelected: boolean;
    onSelect: (session: ClassSession) => void;
}

const ClassSessionCard: React.FC<ClassSessionCardProps> = ({
    session,
    isSelected,
    onSelect
}) => {
    return (
        <div
            className={`border rounded-md p-3 cursor-pointer transition-colors ${
                isSelected
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelect(session)}
        >
            <div className="flex justify-between">
                <div className="font-medium text-gray-800">{session.courseName}</div>
                <div className="text-sm text-gray-500">{session.course}</div>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{session.startTime} - {session.endTime}</span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>{session.room}</span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <User className="h-4 w-4 text-gray-400" />
                <span>{session.instructor}</span>
            </div>
        </div>
    );
};

export default ClassSessionCard;