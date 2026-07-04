import { Favorite } from '../domain/model/favorite.entity';
import { CreateFavoriteRequest } from '../domain/model/create-favorite.request';
import { CreateFavoriteResource, FavoriteResource } from './favorites-response';

export class FavoriteAssembler {
    toEntityFromResource(resource: FavoriteResource): Favorite {
        return new Favorite({
            id: resource.id,
            learnerId: resource.learnerId,
            tutorId: resource.tutorId,
            createdAt: resource.createdAt,
        });
    }

    toEntitiesFromResources(resources: FavoriteResource[]): Favorite[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateFavoriteRequest): CreateFavoriteResource {
        return {
            learnerId: request.learnerId,
            tutorId: request.tutorId,
        };
    }
}