import { BaseEntity } from '../../../shared/infrastructure/base-entity';

export class Question implements BaseEntity {
  private _id: number;
  private _quizId: number;
  private _text: string;
  private _optionA: string;
  private _optionB: string;
  private _optionC: string;
  private _optionD: string;
  private _correctOption: string;

  constructor(question: {
    id: number;
    quizId: number;
    text: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctOption: string;
  }) {
    this._id = question.id;
    this._quizId = question.quizId;
    this._text = question.text;
    this._optionA = question.optionA;
    this._optionB = question.optionB;
    this._optionC = question.optionC;
    this._optionD = question.optionD;
    this._correctOption = question.correctOption;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }
  get quizId(): number {
    return this._quizId;
  }
  set quizId(value: number) {
    this._quizId = value;
  }
  get text(): string {
    return this._text;
  }
  set text(value: string) {
    this._text = value;
  }
  get optionA(): string {
    return this._optionA;
  }
  set optionA(value: string) {
    this._optionA = value;
  }
  get optionB(): string {
    return this._optionB;
  }
  set optionB(value: string) {
    this._optionB = value;
  }
  get optionC(): string {
    return this._optionC;
  }
  set optionC(value: string) {
    this._optionC = value;
  }
  get optionD(): string {
    return this._optionD;
  }
  set optionD(value: string) {
    this._optionD = value;
  }
  get correctOption(): string {
    return this._correctOption;
  }
  set correctOption(value: string) {
    this._correctOption = value;
  }
}
