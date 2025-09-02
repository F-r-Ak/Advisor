import { Routes } from '@angular/router';

export const regionsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/regions/regions.component').then((c) => c.RegionsComponent),
        data: { pageTitle: 'مسميات المناطق', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-regions/add-edit-regions.component').then((c) => c.AddEditRegionsComponent),
        data: { pageTitle: 'اضافة مسمي المنطقة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-regions/add-edit-regions.component').then((c) => c.AddEditRegionsComponent),
        data: { pageTitle: 'تعديل مسمي المنطقة', pageType: 'edit' }
    }
];
