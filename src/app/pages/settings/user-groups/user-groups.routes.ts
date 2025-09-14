import { Routes } from '@angular/router';

export const userGroupsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/user-groups/user-groups.component').then((c) => c.UserGroupsComponent),
        data: { pageTitle: 'مسميات المجموعات الوظيفية', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-user-group/add-edit-user-group.component').then((c) => c.AddEditUserGroupComponent),
        data: { pageTitle: 'اضافة مجموعة وظيفية', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-user-group/add-edit-user-group.component').then((c) => c.AddEditUserGroupComponent),
        data: { pageTitle: 'تعديل مجموعة وظيفية', pageType: 'edit' }
    }
];
