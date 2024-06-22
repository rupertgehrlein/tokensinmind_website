import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';
import { of, from, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export const beginnerQuizGuardFactory: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const supabaseService = new SupabaseService();
  const router = new Router();

  return from(supabaseService.getClient().auth.getUser()).pipe(
    switchMap(user => {
      if (user.data?.user) {
        return from(supabaseService.getCurrentCoins()).pipe(
          map(currentCoins => {
            if (currentCoins >= 50) {
              return true;
            } else {
              router.navigate(['/home']);
              return false;
            }
          })
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
