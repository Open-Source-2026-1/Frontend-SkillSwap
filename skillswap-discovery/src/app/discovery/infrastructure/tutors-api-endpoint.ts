import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Tutor } from '../domain/model/tutor.entity';
import { TutorResource, TutorsResponse } from './tutors-response';
import { TutorAssembler } from './tutor-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export class TutorsApiEndpoint extends BaseApiEndpoint<
  Tutor,
  TutorResource,
  TutorsResponse,
  TutorAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.serverBaseUrl}${environment.tutorsEndpointPath}`,
      new TutorAssembler(),
    );
  }
}
