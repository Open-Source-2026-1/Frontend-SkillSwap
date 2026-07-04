import { Donation } from '../domain/model/donation.entity';
import { DonationStatus } from '../domain/model/donation-status';
import { CreateDonationRequest } from '../domain/model/create-donation.request';
import { CreateDonationResource, DonationResource } from './donations-response';

export class DonationAssembler {
    toEntityFromResource(resource: DonationResource): Donation {
        return new Donation({
            id: resource.id,
            donorId: resource.donorId,
            tutorId: resource.tutorId,
            sessionId: resource.sessionId,
            amount: resource.amount,
            netAmount: resource.netAmount,
            commission: resource.commission,
            currency: resource.currency,
            status: resource.status as DonationStatus,
            createdAt: resource.createdAt,
            updatedAt: resource.updatedAt,
        });
    }

    toEntitiesFromResources(resources: DonationResource[]): Donation[] {
        return resources.map((resource) => this.toEntityFromResource(resource));
    }

    toResourceFromCreateRequest(request: CreateDonationRequest): CreateDonationResource {
        return {
            donorId: request.donorId,
            tutorId: request.tutorId,
            sessionId: request.sessionId,
            amount: request.amount,
            commission: request.commission,
            currency: request.currency,
        };
    }
}