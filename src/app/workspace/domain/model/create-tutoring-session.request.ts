
export interface CreateTutoringSessionRequest {
    learnerId: number;
    tutorId: number;
    topic: string;
    message: string;
    studentLevel: string;
    scheduledAt: string;
}