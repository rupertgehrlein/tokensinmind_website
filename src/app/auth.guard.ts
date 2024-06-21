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
    //tap(user => console.log('User:', user)), // Log the user object
    map(user =>!!user.data?.user? true : false),
    catchError(error => {
      console.error('Error getting user:', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
