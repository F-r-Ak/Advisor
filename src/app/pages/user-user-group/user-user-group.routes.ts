import { Routes } from '@angular/router';

export const UserUserGroupRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-user-group/user-user-group.component').then((c) => c.UserUserGroupComponent),
        data: { pageTitle: 'عضوية المستخدم فى المجموعات', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-user-user-group/add-edit-user-user-group.component').then((c) => c.AddEditUserUserGroupComponent),
        data: { pageTitle: 'اضافة عضوية مستخدم فى المجموعات', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-user-user-group/add-edit-user-user-group.component').then((c) => c.AddEditUserUserGroupComponent),
        data: { pageTitle: ' تعديل عضوية مستخدم فى المجموعات', pageType: 'edit' }
    }
];
