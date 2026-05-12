import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Tutor implements BaseEntity {
  private _id: number;
  private _name: string;
  private _university: string;
  private _course: string;
  private _rating: number;
  private _biography: string;

  constructor(tutor: {
    id: number;
    name: string;
    university: string;
    course: string;
    rating: number;
    biography: string;
  }) {
    this._id = tutor.id;
    this._name = tutor.name;
    this._university = tutor.university;
    this._course = tutor.course;
    this._rating = tutor.rating;
    this._biography = tutor.biography;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  get university(): string {
    return this._university;
  }
  set university(value: string) {
    this._university = value;
  }
  get course(): string {
    return this._course;
  }
  set course(value: string) {
    this._course = value;
  }
  get rating(): number {
    return this._rating;
  }
  set rating(value: number) {
    this._rating = value;
  }
  get biography(): string {
    return this._biography;
  }
  set biography(value: string) {
    this._biography = value;
  }
}
