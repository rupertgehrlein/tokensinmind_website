import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable, from } from 'rxjs';

export const authGuardFactory: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const supabaseService = new SupabaseService();
  const router = new Router();

  return from(supabaseService.getClient().auth.getUser()).pipe(
    tap(user => console.log('User:', user)), // Log the user object
    map(user =>!!user.data?.user? true : false), // Simplify the condition for clarity
    catchError(error => {
      console.error('Error getting user:', error);
      console.log('Navigating to /login');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
