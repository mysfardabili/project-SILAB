export interface ClassSession {
    id: string;
    course: string;
    courseName: string;
    instructor: string;
    room: string;
    startTime: string;
    endTime: string;
    date: string;
    checkinCode?: string;
    active: boolean;
}

export interface CheckinResult {
    success: boolean;
    message: string;
    timestamp?: string;
    status?: "present" | "late";
}

export type CheckinMethod = "code" | "location" | "qr";