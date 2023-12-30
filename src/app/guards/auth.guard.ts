import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {

  const authStatus = inject(AuthService)
  const toaster = inject(ToasterService)
  const router = inject(Router)
  if(authStatus.isLoggined()){
    return true;

  }else{
    toaster.showWarning("Operation Denied..Please Login")
    router.navigateByUrl("/")
    return false;
  }
 
};
