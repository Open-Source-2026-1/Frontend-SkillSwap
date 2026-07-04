import { Tutor } from '../domain/model/tutor.entity';
import { CreateTutorRequest } from '../domain/model/create-tutor.request';
import { UpdateTutorRequest } from '../domain/model/update-tutor.request';
import { CreateTutorResource, TutorResource, UpdateTutorResource } from './tutors-response';

export class TutorAssembler {
    toEntityFromResource(resource: TutorResource): Tutor {
        return new Tutor({
            id: resource.id,
            userId: resource.userId,
            name: resource.name,
            university: resource.university,
            bio: resource.bio,
            rating: resource.rating,
            skills: resource.skills,
            available: resource.available,
            avatarUrl: resource.avatarUrl,
            specialty: resource.specialty ?? '',
            portfolioUrl: resource.portfolioUrl ?? '',
            yearsExperience: resource.yearsExperience ?? 0,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: TutorResource[]): Tutor[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateTutorRequest): CreateTutorResource {
        return {
            userId: request.userId,
            name: request.name,
            university: request.university,
            bio: request.bio,
            rating: 0,
            skills: request.skills,
            available: true,
            avatarUrl: request.avatarUrl,
            specialty: request.specialty,
            portfolioUrl: request.portfolioUrl,
            yearsExperience: request.yearsExperience,
        };
    }

    toResourceFromUpdateRequest(request: UpdateTutorRequest): UpdateTutorResource {
        return {
            name: request.name,
            university: request.university,
            bio: request.bio,
            skills: request.skills,
            available: request.available,
            avatarUrl: request.avatarUrl,
            specialty: request.specialty,
            portfolioUrl: request.portfolioUrl,
            yearsExperience: request.yearsExperience,
        };
    }
}