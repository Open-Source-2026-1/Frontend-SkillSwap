import { BaseApi } from '../../shared/infrastructure/base-api';
import { Donation } from '../domain/model/donation.entity';
import { HttpClient } from '@angular/common/http';
import { DonationsApiEndpoint } from './donations-api-endpoint';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentsApi extends BaseApi {
  private readonly donationsEndpoint: DonationsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.donationsEndpoint = new DonationsApiEndpoint(http);
  }

  /**
   * Retrieves all donations from the API.
   * @returns An Observable for an array of Donation objects.
   */
  getDonations(): Observable<Donation[]> {
    return this.donationsEndpoint.getAll();
  }

  /**
   * Retrieves a single donation by ID.
   * @param id - The ID of the donation.
   * @returns An Observable of the Donation object.
   */
  getDonation(id: number): Observable<Donation> {
    return this.donationsEndpoint.getById(id);
  }

  /**
   * Creates a new donation.
   * @param donation - The donation to create.
   * @returns An Observable of the created Donation object.
   */
  createDonation(donation: Donation): Observable<Donation> {
    return this.donationsEndpoint.create(donation);
  }

  /**
   * Updates an existing donation.
   * @param donation - The donation to update.
   * @returns An Observable of the updated Donation object.
   */
  updateDonation(donation: Donation): Observable<Donation> {
    return this.donationsEndpoint.update(donation, donation.id);
  }

  /**
   * Deletes a donation by ID.
   * @param id - The ID of the donation to delete.
   * @returns An Observable of void.
   */
  deleteDonation(id: number): Observable<void> {
    return this.donationsEndpoint.delete(id);
  }
}
