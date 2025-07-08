"use client";

import { Calendar as CalendarIcon, Clock, Bell, ChevronRight, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock data
const scheduleData = {
    todayDate: "April 18, 2025",
    upcomingEvents: [
        {
            id: "1",
            title: "Web Technology Lab",
            time: "2:00 PM - 3:30 PM",
            course: "Web Technology",
            location: "Lab Room 302",
            today: true
        },
        {
            id: "2",
            title: "Data Structures Quiz",
            time: "10:00 AM - 11:00 AM",
            course: "Data Structures",
            location: "Online",
            today: false,
            daysAway: 1
        },
        {
            id: "3",
            title: "Study Group Meeting",
            time: "4:00 PM - 5:30 PM",
            course: "Web Technology",
            location: "Study Hall B",
            today: false,
            daysAway: 2
        }
    ],
    reminders: [
        {
            id: "1",
            title: "Complete Module 1 Assignment",
            deadline: "Tomorrow, 11:59 PM",
            course: "Web Technology"
        },
        {
            id: "2",
            title: "Review Linked List Materials",
            deadline: "Before Quiz",
            course: "Data Structures"
        }
    ]
};

const StudySchedule = () => {
    return (
        <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <CalendarIcon className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Study Schedule</h3>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="px-6 py-4 space-y-5">
                {/* Today's Date */}
                <div className="bg-gray-50 rounded-md py-3 px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-700">Today</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{scheduleData.todayDate}</span>
                </div>

                {/* Upcoming Classes/Events */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Upcoming Classes & Events</span>
                    </div>
                    <div className="space-y-2">
                        {scheduleData.upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                className={`bg-gray-50 rounded-md border-l-4 ${event.today ? 'border-green-400' : 'border-amber-400'
                                    } py-2 px-3`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{event.title}</span>
                                    <span className="text-xs font-medium text-indigo-600">
                                        {event.today ? (
                                            'Today'
                                        ) : event.daysAway !== undefined ? (
                                            `In ${event.daysAway} day${event.daysAway > 1 ? 's' : ''}`
                                        ) : null}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{event.course}</span>
                                    <span className="text-xs text-gray-500">{event.time}</span>
                                </div>
                                <div className="text-xs text-gray-500">{event.location}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reminders */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Bell className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Reminders</span>
                    </div>
                    <div className="space-y-2">
                        {scheduleData.reminders.map((reminder) => (
                            <div key={reminder.id} className="bg-gray-50 rounded-md border-l-4 border-red-400 py-2 px-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{reminder.title}</span>
                                    <span className="text-xs font-medium text-red-600">{reminder.deadline}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{reminder.course}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Link
                        href="/schedule"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        View full calendar <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudySchedule;