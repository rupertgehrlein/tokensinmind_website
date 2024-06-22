import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { of, from, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const expertQuizGuardFactory: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const supabaseService = new SupabaseService();
  const router = new Router();

  return from(supabaseService.getClient().auth.getUser()).pipe(
    switchMap(user => {
      if (user.data?.user) {
        return from(supabaseService.getCurrentCoins()).pipe(
          switchMap(currentCoins =>
            from(supabaseService.getQuizStatus()).pipe(
              map(quizStatus => {
                if (currentCoins >= 100 && quizStatus.beginner && quizStatus.pro) {
                  return true;
                } else {
                  router.navigate(['/']);
                  return false;
                }
              })
            )
          )
        );
      } else {
        router.navigate(['/login']);
        return of(false);
      }
    }),
    catchError(error => {
      console.error('Error getting coins or user:', error);
      router.navigate(['/home']);
      return of(false);
    })
  );
};
