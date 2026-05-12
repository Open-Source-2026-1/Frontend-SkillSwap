import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Sanction } from '../domain/model/sanction.entity';
import { SanctionsResponse, SanctionResource } from './sanctions-response';
import { SanctionAssembler } from './sanction-assembler';
import { environment } from '../../../environments/environment';

export class SanctionsApiEndpoint extends BaseApiEndpoint<Sanction, SanctionResource, SanctionsResponse, SanctionAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderSanctionsEndpointPath}`,
      new SanctionAssembler()
    );
  }
}
