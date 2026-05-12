import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Represents the API response structure for a list of donations.
 */
export interface DonationsResponse extends BaseResponse {
  /**
   * The list of donations returned by the API.
   */
  donations: DonationResource[];
}

/**
 * Represents the API resource/DTO for a donation.
 */
export interface DonationResource extends BaseResource {
  id: number;
  amount: number;
  commissionFee: number;
  netAmount: number;
  stripeTransactionId: string;
  tutorId: number;
  sessionId: number;
}
