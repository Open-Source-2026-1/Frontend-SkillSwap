import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Donation } from '../domain/model/donation.entity';
import { DonationResource, DonationsResponse } from './donations-response';
import { DonationAssembler } from './donation-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class DonationsApiEndpoint extends BaseApiEndpoint<
  Donation,
  DonationResource,
  DonationsResponse,
  DonationAssembler
> {
  /**
   * Creates an instance of DonationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderDonationsEndpointPath}`,
      new DonationAssembler(),
    );
  }
}
