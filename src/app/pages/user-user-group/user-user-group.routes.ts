import { Routes } from '@angular/router';

export const UserUserGroupRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-user-group/user-user-group.component').then((c) => c.UserUserGroupComponent),
        data: { pageTitle: 'ادوار المستخدم', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-user-user-group/add-edit-user-user-group.component').then((c) => c.AddEditUserUserGroupComponent),
        data: { pageTitle: 'اضافة دور مستخدم', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-user-user-group/add-edit-user-user-group.component').then((c) => c.AddEditUserUserGroupComponent),
        data: { pageTitle: 'تعديل دور مستخدم', pageType: 'edit' }
    }
];
