import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { ReportStatus } from './report-status';

export class Report implements BaseEntity {
    private _id: number;
    private _reporterUserId: number;
    private _reportedUserId: number;
    private _sessionId: number;
    private _reason: string;
    private _status: ReportStatus;
    private _closed: boolean;
    private _reportedAt: string;
    private _createdAt: string;
    private _updatedAt: string;

    constructor(report: {
        id: number;
        reporterUserId: number;
        reportedUserId: number;
        sessionId: number;
        reason: string;
        status: ReportStatus;
        closed: boolean;
        reportedAt: string;
        createdAt: string;
        updatedAt?: string;
    }) {
        this._id = report.id;
        this._reporterUserId = report.reporterUserId;
        this._reportedUserId = report.reportedUserId;
        this._sessionId = report.sessionId;
        this._reason = report.reason;
        this._status = report.status;
        this._closed = report.closed;
        this._reportedAt = report.reportedAt;
        this._createdAt = report.createdAt;
        this._updatedAt = report.updatedAt ?? '';
    }

    get id(): number { return this._id; }
    set id(value: number) { this._id = value; }

    get reporterUserId(): number { return this._reporterUserId; }
    set reporterUserId(value: number) { this._reporterUserId = value; }

    get reportedUserId(): number { return this._reportedUserId; }
    set reportedUserId(value: number) { this._reportedUserId = value; }

    get sessionId(): number { return this._sessionId; }
    set sessionId(value: number) { this._sessionId = value; }

    get reason(): string { return this._reason; }
    set reason(value: string) { this._reason = value; }

    get status(): ReportStatus { return this._status; }
    set status(value: ReportStatus) { this._status = value; }

    get closed(): boolean { return this._closed; }
    set closed(value: boolean) { this._closed = value; }

    get reportedAt(): string { return this._reportedAt; }
    get createdAt(): string { return this._createdAt; }
    get updatedAt(): string { return this._updatedAt; }
}