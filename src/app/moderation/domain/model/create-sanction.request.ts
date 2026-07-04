
export interface CreateSanctionRequest {
    reportId: number;
    sanctionedUserId: number;
    type: string;
    description: string;
    durationDays: number;
}