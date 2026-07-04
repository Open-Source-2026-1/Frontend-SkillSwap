import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { IamStore } from '../application/iam-store';

/**
 * Agrega `Authorization: Bearer <token>` a cada request salientes cuando hay
 * sesión activa. No hace daño agregarlo también a endpoints públicos
 * (Tutors, Reviews, etc. siguen sin pedir token) — el backend simplemente
 * lo ignora en esas rutas.
 */
export const iamInterceptor: HttpInterceptorFn = (request, next) => {
    const iamStore = inject(IamStore);
    const token = iamStore.token();

    if (!token) {
        return next(request);
    }

    const authenticatedRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authenticatedRequest);
};
