import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    //Для того чтобы делать редирект
    private  router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedIn()) {
      // Если пользователь залогинен
      return true
    } else{
      // Иначе направляем его на страницу логина
      //  и передаем queryParams чтобы мы могли обработать даннуую ошибку
      this.router.navigate(['/login'], {
          queryParams: {
            accessDenied: true
          }
      })
          return false
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state)
  }

}
