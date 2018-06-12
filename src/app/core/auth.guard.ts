import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@wh-share/auth.service';
import * as _ from 'lodash';
import { take, map, tap } from 'rxjs/operators';





@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user
      .pipe(
        take(1),
        map(user => _.has(_.get(user, 'roles'), 'admin' || 'editor')),
        tap(authorized => {
          if (!authorized) {
            console.log('route prevented!');
            this.router.navigate(['/login']);
          }
        })
      );
  }
}
