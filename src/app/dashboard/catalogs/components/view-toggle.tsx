import { Grid, List } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export type ViewMode = "grid" | "list";

interface ViewToggleProps {
    viewMode: ViewMode;
    setViewMode: Dispatch<SetStateAction<ViewMode>>;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
    return (
        <div className="flex border rounded-md overflow-hidden">
            <button
                className={`flex items-center justify-center p-2 w-10 ${viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
            >
                <Grid className="h-4 w-4" />
            </button>
            <button
                className={`flex items-center justify-center p-2 w-10 ${viewMode === "list" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
            >
                <List className="h-4 w-4" />
            </button>
        </div>
    );
};

export default ViewToggle;