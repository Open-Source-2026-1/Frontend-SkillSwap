
export interface CreateDonationRequest {
    donorId: number;
    tutorId: number;
    sessionId: number;
    amount: number;
    commission: number;
    currency: string;
}