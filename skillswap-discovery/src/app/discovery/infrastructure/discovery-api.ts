import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Tutor } from '../domain/model/tutor.entity';
import { TutorsApiEndpoint } from './tutors-api-endpoint';

@Injectable({ providedIn: 'root' })
export class DiscoveryApi extends BaseApi {
  private readonly tutorsEndpoint: TutorsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.tutorsEndpoint = new TutorsApiEndpoint(http);
  }

  getTutors(): Observable<Tutor[]> {
    return this.tutorsEndpoint.getAll();
  }
  getTutor(id: number): Observable<Tutor> {
    return this.tutorsEndpoint.getById(id);
  }
  createTutor(tutor: Tutor): Observable<Tutor> {
    return this.tutorsEndpoint.create(tutor);
  }
  updateTutor(tutor: Tutor): Observable<Tutor> {
    return this.tutorsEndpoint.update(tutor, tutor.id);
  }
  deleteTutor(id: number): Observable<void> {
    return this.tutorsEndpoint.delete(id);
  }
}
