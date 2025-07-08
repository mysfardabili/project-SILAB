"use client";

import { Calendar } from "lucide-react";
import { UpcomingClass } from "@/lib/types/attendance";

interface UpcomingClassesProps {
  classes: UpcomingClass[];
}

export const UpcomingClasses = ({ classes }: UpcomingClassesProps) => {
  const hasUpcomingClasses = classes.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-indigo-500" />
        <span className="text-sm font-medium text-gray-600">
          Upcoming Classes
        </span>
      </div>
      {hasUpcomingClasses ? (
        <div className="space-y-2">
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="bg-gray-50 rounded-md border border-gray-200 py-2 px-3"
            >
              <div className="text-sm font-medium text-gray-700">
                {cls.course}
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{cls.date}</span>
                <span className="text-xs text-gray-500">{cls.time}</span>
              </div>
              {cls.room && (
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-500">
                    Room: {cls.room}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
          <p className="text-sm text-gray-500">No upcoming classes scheduled</p>
        </div>
      )}
    </div>
  );
};

