import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IamStore } from '../application/iam-store';
import { environment } from '../../../environments/environment';

export const iamInterceptor: HttpInterceptorFn = (request, next) => {
    const iamStore = inject(IamStore);
    const token = iamStore.token();

    const isOwnBackend = request.url.startsWith(environment.platformProviderBackendApiBaseUrl);

    if (!token || !isOwnBackend) {
        return next(request);
    }

    const authenticatedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authenticatedRequest);
};