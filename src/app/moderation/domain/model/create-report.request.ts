
export interface CreateReportRequest {
    reporterUserId: number;
    reportedUserId: number;
    sessionId: number;
    reason: string;
}