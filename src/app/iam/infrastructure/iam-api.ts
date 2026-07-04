import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { User } from '../domain/model/user.entity';
import { SignUpRequest } from '../domain/model/sign-up.request';
import { SignInRequest } from '../domain/model/sign-in.request';
import { UpdateUserRolesRequest } from '../domain/model/update-user-roles.request';
import { AuthenticationApiEndpoint, AuthenticatedSession } from './authentication-api-endpoint';
import { UsersApiEndpoint } from './users-api-endpoint';

@Injectable({
    providedIn: 'root',
})
export class IamApi extends BaseApi {
    private readonly authenticationEndpoint: AuthenticationApiEndpoint;
    private readonly usersEndpoint: UsersApiEndpoint;

    constructor(http: HttpClient) {
        super();
        this.authenticationEndpoint = new AuthenticationApiEndpoint(http);
        this.usersEndpoint = new UsersApiEndpoint(http);
    }

    signUp(request: SignUpRequest): Observable<User> {
        return this.authenticationEndpoint.signUp(request);
    }

    signIn(request: SignInRequest): Observable<AuthenticatedSession> {
        return this.authenticationEndpoint.signIn(request);
    }

    updateUserRoles(userId: number, request: UpdateUserRolesRequest): Observable<User> {
        return this.usersEndpoint.updateRoles(userId, request);
    }

    verifyUser(userId: number): Observable<User> {
        return this.usersEndpoint.verify(userId);
    }
}
