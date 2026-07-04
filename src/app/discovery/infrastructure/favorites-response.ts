import { BaseResource } from '../../shared/infrastructure/base-response';

export interface FavoriteResource extends BaseResource {
    id: number;
    learnerId: number;
    tutorId: number;
    createdAt: string;
}

/** Body para POST /favorites. */
export interface CreateFavoriteResource {
    learnerId: number;
    tutorId: number;
}