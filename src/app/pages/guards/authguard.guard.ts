import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';;
import { Helper } from 'src/app/api/helpers/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
  
    if ( localStorage.getItem('accessToken') != null && this.checkUserPermission('admin') ) {
      this.router.navigate(['/apexchart'], { queryParams: { redirect: state.url }, replaceUrl: true });
    }else if(localStorage.getItem('accessToken') != null && this.checkUserPermission('org') ){
      this.router.navigate(['/pages/my-organization'], { queryParams: { redirect: state.url }, replaceUrl: true });

    }
    return true
    

  }

  checkUserPermission(role:any) {
    
    return Helper.hasAccessRole(role);
  }
}
