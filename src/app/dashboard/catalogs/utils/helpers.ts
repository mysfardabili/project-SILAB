// Convert material type to display name
export const getTypeDisplayName = (type: string): string => {
    switch (type) {
        case "quiz": return "Quiz";
        case "page": return "Page";
        case "course": return "Course";
        case "learning-path": return "Learning Path";
        default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
};

// Convert status value to display name
export const getStatusDisplayName = (status: string): string => {
    switch (status) {
        case "not-started": return "Not Started";
        case "in-progress": return "In Progress";
        case "complete": return "Complete";
        default: return "All Status";
    }
};