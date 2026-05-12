import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Quiz implements BaseEntity {
  private _id: number;
  private _title: string;
  private _course: string;
  private _status: string;
  private _professorId: number;

  constructor(quiz: {
    id: number;
    title: string;
    course: string;
    status: string;
    professorId: number;
  }) {
    this._id = quiz.id;
    this._title = quiz.title;
    this._course = quiz.course;
    this._status = quiz.status;
    this._professorId = quiz.professorId;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }
  get course(): string {
    return this._course;
  }
  set course(value: string) {
    this._course = value;
  }
  get status(): string {
    return this._status;
  }
  set status(value: string) {
    this._status = value;
  }
  get professorId(): number {
    return this._professorId;
  }
  set professorId(value: number) {
    this._professorId = value;
  }
}
