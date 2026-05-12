import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Report } from '../domain/model/report.entity';
import { ReportsResponse, ReportResource } from './reports-response';
import { ReportAssembler } from './report-assembler';
import { environment } from '../../../environments/environment';

export class ReportsApiEndpoint extends BaseApiEndpoint<Report, ReportResource, ReportsResponse, ReportAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderReportsEndpointPath}`,
      new ReportAssembler()
    );
  }
}
