import { Injectable } from '@angular/core';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Tutor } from '../domain/model/tutor.entity';
import { Favorite } from '../domain/model/favorite.entity';
import { CreateFavoriteRequest } from '../domain/model/create-favorite.request';
import { CreateTutorRequest } from '../domain/model/create-tutor.request';
import { UpdateTutorRequest } from '../domain/model/update-tutor.request';
import { HttpClient } from '@angular/common/http';
import { TutorsApiEndpoint } from './tutors-api-endpoint';
import { FavoritesApiEndpoint } from './favorites-api-endpoint';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DiscoveryApi extends BaseApi {
    private readonly tutorsEndpoint: TutorsApiEndpoint;
    private readonly favoritesEndpoint: FavoritesApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.tutorsEndpoint = new TutorsApiEndpoint(http);
        this.favoritesEndpoint = new FavoritesApiEndpoint(http);
    }

    getTutors(): Observable<Tutor[]> {
        return this.tutorsEndpoint.getAll();
    }

    getTutor(id: number): Observable<Tutor> {
        return this.tutorsEndpoint.getById(id);
    }

    createTutor(request: CreateTutorRequest): Observable<Tutor> {
        return this.tutorsEndpoint.create(request);
    }

    updateTutor(tutorId: number, request: UpdateTutorRequest): Observable<Tutor> {
        return this.tutorsEndpoint.update(tutorId, request);
    }

    getTutorByUserId(userId: number): Observable<Tutor | null> {
        return this.tutorsEndpoint.getByUserId(userId);
    }

    getFavoritesByLearner(learnerId: number): Observable<Favorite[]> {
        return this.favoritesEndpoint.getByLearnerId(learnerId);
    }

    addFavorite(request: CreateFavoriteRequest): Observable<Favorite> {
        return this.favoritesEndpoint.create(request);
    }

    removeFavorite(learnerId: number, tutorId: number): Observable<void> {
        return this.favoritesEndpoint.removeByLearnerAndTutor(learnerId, tutorId);
    }
}