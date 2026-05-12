import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../domain/model/report.entity';
import { Sanction } from '../domain/model/sanction.entity';
import { ReportsApiEndpoint } from './reports-api-endpoint';
import { SanctionsApiEndpoint } from './sanctions-api-endpoint';

@Injectable({ providedIn: 'root' })
export class ModerationApiService {
  private http = inject(HttpClient);
  private readonly reportsEndpoint:   ReportsApiEndpoint;
  private readonly sanctionsEndpoint: SanctionsApiEndpoint;

  constructor() {
    this.reportsEndpoint   = new ReportsApiEndpoint(this.http);
    this.sanctionsEndpoint = new SanctionsApiEndpoint(this.http);
  }

  // ── Reports ────────────────────────────────────────────────
  getReports():               Observable<Report[]>  { return this.reportsEndpoint.getAll(); }
  getReport(id: number):      Observable<Report>    { return this.reportsEndpoint.getById(id); }
  createReport(r: Report):    Observable<Report>    { return this.reportsEndpoint.create(r); }
  updateReport(r: Report):    Observable<Report>    { return this.reportsEndpoint.update(r, r.id); }
  deleteReport(id: number):   Observable<void>      { return this.reportsEndpoint.delete(id); }

  // ── Sanctions ──────────────────────────────────────────────
  getSanctions():              Observable<Sanction[]> { return this.sanctionsEndpoint.getAll(); }
  getSanction(id: number):     Observable<Sanction>   { return this.sanctionsEndpoint.getById(id); }
  createSanction(s: Sanction): Observable<Sanction>   { return this.sanctionsEndpoint.create(s); }
  updateSanction(s: Sanction): Observable<Sanction>   { return this.sanctionsEndpoint.update(s, s.id); }
  deleteSanction(id: number):  Observable<void>       { return this.sanctionsEndpoint.delete(id); }
}
