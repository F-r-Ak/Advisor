import { Routes } from '@angular/router';

export const userRoleRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-role/user-role.component').then((c) => c.UserRoleComponent),
        data: { pageTitle: 'تصنيفات صلاحيات المستخدم', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-user-role/add-edit-user-role.component').then((c) => c.AddEditUserRoleComponent),
        data: { pageTitle: 'اضافة صلاحية المستخدم', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-user-role/add-edit-user-role.component').then((c) => c.AddEditUserRoleComponent),
        data: { pageTitle: 'تعديل صلاحية المستخدم', pageType: 'edit' }
    }
];
