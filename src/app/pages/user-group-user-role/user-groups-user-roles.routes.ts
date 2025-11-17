import { Routes } from '@angular/router';

export const userGroupsUserRolesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-groups-user-roles/user-groups-user-roles.component').then((c) => c.UserGroupUserRoleComponent),
    data: { pageTitle: 'صلاحيات الادوار', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/user-group-user-role/add-edit-user-group-user-role.component').then((c) => c.AddEditUserGroupUserRoleComponent),
    data: { pageTitle: 'اضافة صلاحيات الادوار', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/user-group-user-role/add-edit-user-group-user-role.component').then((c) => c.AddEditUserGroupUserRoleComponent),
    data: { pageTitle: ' تعديل صلاحيات الادوار', pageType: 'edit' }
  }
];
