
export interface CreateReviewRequest {
    tutorId: number;
    learnerId: number;
    learnerName: string;
    rating: number;
    comment: string;
    sessionId: number;
}