import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type AnnouncementProps = {
    title: string;
    description: string;
};

export const Announcement = ({ title, description }: AnnouncementProps) => {
    return (
        <Alert className="rounded-md shadow-sm">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertTitle className="font-semibold">{title}</AlertTitle>
            <AlertDescription className="text-sm text-gray-700">
                {description}
            </AlertDescription>
        </Alert>
    );
};