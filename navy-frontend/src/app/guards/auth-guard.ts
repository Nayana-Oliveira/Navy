import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../services/admin';

export const authGuard: CanActivateFn = () => {
  const adminService = inject(AdminService);

  const router = inject(Router);

  if (adminService.estaLogado()) {
    return true;
  }

  router.navigate(['/admin']);

  return false;
};
