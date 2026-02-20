import { Clock, MapPin, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UpcomingSchedule() {
  const schedule = [
    {
      id: 1,
      course: "Database Systems",
      type: "Lecture",
      time: "10:00 AM - 11:30 AM",
      location: "Room 301, Tech Building",
      instructor: "Dr. Robert Chen",
      status: "upcoming",
    },
    {
      id: 2,
      course: "Web Technology",
      type: "Lab",
      time: "01:00 PM - 03:00 PM",
      location: "Lab 4, Comp Sci Wing",
      instructor: "Prof. Sarah Jenkins",
      status: "later",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">Today's Schedule</CardTitle>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            {schedule.length} Classes
          </Badge>
        </div>
        <CardDescription>Your upcoming academic commitments for today.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {schedule.length > 0 ? (
          schedule.map((item) => (
            <div 
              key={item.id} 
              className={`flex gap-3 p-3 rounded-lg border ${
                item.status === 'upcoming' 
                  ? 'border-indigo-100 bg-indigo-50/50 relative overflow-hidden' 
                  : 'border-gray-100 bg-gray-50'
              }`}
            >
              {item.status === 'upcoming' && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-l-lg"></div>
              )}
              
              <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-md py-2 px-3 min-w-[70px] shadow-sm">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {item.time.split(' - ')[0].split(' ')[1]}
                </span>
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  {item.time.split(' - ')[0].split(':')[0]}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{item.course}</h4>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    {item.type}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                    <span className="truncate">{item.time}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Users className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                    <span className="truncate">{item.instructor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-500">No more classes scheduled for today.</p>
            <Button variant="outline" size="sm" className="mt-4">
              View Weekly Calendar
            </Button>
          </div>
        )}
        
        <div className="pt-2">
          <Button variant="ghost" className="w-full text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 text-sm">
            View Full Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
