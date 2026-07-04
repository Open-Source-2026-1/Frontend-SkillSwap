import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IamStore } from '../application/iam-store';


export const iamGuard: CanActivateFn = (route, state) => {
    const iamStore = inject(IamStore);
    const router = inject(Router);

    if (!iamStore.isSignedIn()) {
        return router.createUrlTree(['/iam/sign-in'], { queryParams: { returnUrl: state.url } });
    }

    const pending = iamStore.nextRequiredRoute();
    if (pending && !state.url.startsWith(pending)) {
        return router.createUrlTree([pending]);
    }

    return true;
};

/** Protege rutas exclusivas de tutor. */
export const tutorGuard: CanActivateFn = () => {
    const iamStore = inject(IamStore);
    const router = inject(Router);

    if (iamStore.isSignedIn() && iamStore.isTutor()) {
        return true;
    }

    return router.createUrlTree(['/home']);
};

/** Protege rutas exclusivas de moderador. */
export const moderatorGuard: CanActivateFn = () => {
    const iamStore = inject(IamStore);
    const router = inject(Router);

    if (iamStore.isSignedIn() && iamStore.isModerator()) {
        return true;
    }

    return router.createUrlTree(['/home']);
};