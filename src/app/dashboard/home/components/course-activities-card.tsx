import { ClipboardList, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type Activity = {
    title: string;
    link: string;
};

type CourseActivitiesCardProps = {
    activities: Activity[];
};

const CourseActivitiesCard = ({ activities }: CourseActivitiesCardProps) => {
    return (
        <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <ClipboardList className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Course Activities</h3>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="px-6 py-4 space-y-3">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 rounded-md border-l-4 border-indigo-400 py-3 px-4 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                <span className="font-bold text-indigo-700">{activity.title.split(":")[0]?.trim()}</span>
                                {activity.title.split(":")[1] && `: ${activity.title.split(":")[1]?.trim()}`}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">Keep going, you're making progress!</p>
                        </div>
                        <Link
                            href={activity.link}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                        >
                            Continue <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                ))}
                {activities.length === 0 && (
                    <div className="py-4 text-center text-gray-500">
                        No activities available yet.
                    </div>
                )}
            </div>
        </div>
    );
};

// Import the ChevronRight icon from lucide-react


export default CourseActivitiesCard;