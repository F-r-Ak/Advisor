import { Routes } from '@angular/router';

export const userBranchRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-branch/user-branch.component').then((c) => c.UserBranchComponent),
    data: { pageTitle: 'فروع المستخدمين', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-user-branch/add-edit-user-branch.component').then((c) => c.AddEditUserBranchComponent),
    data: { pageTitle: 'اضافة فرع المستخدم', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-user-branch/add-edit-user-branch.component').then((c) => c.AddEditUserBranchComponent),
    data: { pageTitle: 'تعديل بيانات فرع المستخدم', pageType: 'edit' }
  }
];
