import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { TutoringSession } from '../domain/model/tutoring-session.entity';
import { TutoringSessionsResponse, TutoringSessionResource } from './tutoring-sessions-response';
import { TutoringSessionAssembler } from './tutoring-session-assembler';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export class TutoringSessionsApiEndpoint extends BaseApiEndpoint<
  TutoringSession,
  TutoringSessionResource,
  TutoringSessionsResponse,
  TutoringSessionAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderTutoringSessionsEndpointPath}`,
      new TutoringSessionAssembler(),
    );
  }
}
