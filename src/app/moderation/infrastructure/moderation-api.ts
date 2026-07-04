import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Report } from '../domain/model/report.entity';
import { Sanction } from '../domain/model/sanction.entity';
import { CreateReportRequest } from '../domain/model/create-report.request';
import { CreateSanctionRequest } from '../domain/model/create-sanction.request';
import { ReportsApiEndpoint } from './reports-api-endpoint';
import { SanctionsApiEndpoint } from './sanctions-api-endpoint';

@Injectable({
    providedIn: 'root',
})
export class ModerationApi extends BaseApi {
    private readonly reportsEndpoint: ReportsApiEndpoint;
    private readonly sanctionsEndpoint: SanctionsApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.reportsEndpoint = new ReportsApiEndpoint(http);
        this.sanctionsEndpoint = new SanctionsApiEndpoint(http);
    }

    getReports(): Observable<Report[]> {
        return this.reportsEndpoint.getAll();
    }

    createReport(request: CreateReportRequest): Observable<Report> {
        return this.reportsEndpoint.create(request);
    }

    closeReport(reportId: number): Observable<Report> {
        return this.reportsEndpoint.close(reportId);
    }

    getSanctions(): Observable<Sanction[]> {
        return this.sanctionsEndpoint.getAll();
    }

    createSanction(request: CreateSanctionRequest): Observable<Sanction> {
        return this.sanctionsEndpoint.create(request);
    }
}