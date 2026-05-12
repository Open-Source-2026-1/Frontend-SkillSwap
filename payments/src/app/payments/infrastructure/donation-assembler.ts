import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Donation } from '../domain/model/donation.entity';
import { DonationResource, DonationsResponse } from './donations-response';

export class DonationAssembler implements BaseAssembler<
  Donation,
  DonationResource,
  DonationsResponse
> {
  /**
   * Converts a DonationsResponse to an array of Donation entities.
   * @param response - The API response containing donations.
   * @returns An array of Donation entities.
   */
  toEntitiesFromResponse(response: DonationsResponse): Donation[] {
    return response.donations.map((resource) =>
      this.toEntityFromResource(resource as DonationResource),
    );
  }

  /**
   * Converts a DonationResource to a Donation entity.
   * @param resource - The resource to convert.
   * @returns The converted Donation entity.
   */
  toEntityFromResource(resource: DonationResource): Donation {
    return new Donation({
      id: resource.id,
      amount: resource.amount,
      commissionFee: resource.commissionFee,
      netAmount: resource.netAmount,
      stripeTransactionId: resource.stripeTransactionId,
      tutorId: resource.tutorId,
      sessionId: resource.sessionId,
    });
  }

  /**
   * Converts a Donation entity to a DonationResource.
   * @param entity - The entity to convert.
   * @returns The converted DonationResource.
   */
  toResourceFromEntity(entity: Donation): DonationResource {
    return {
      id: entity.id,
      amount: entity.amount,
      commissionFee: entity.commissionFee,
      netAmount: entity.netAmount,
      stripeTransactionId: entity.stripeTransactionId,
      tutorId: entity.tutorId,
      sessionId: entity.sessionId,
    } as DonationResource;
  }
}
