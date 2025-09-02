import { Routes } from '@angular/router';

export const sallerCategoryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/saller-category/saller-category.component').then((c) => c.SallerCategoryComponent),
        data: { pageTitle: 'تصنيفات الموردين', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-saller-category/add-edit-saller-category.component').then((c) => c.AddEditSallerCategoryComponent),
        data: { pageTitle: 'اضافة تصنيف مورد', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-saller-category/add-edit-saller-category.component').then((c) => c.AddEditSallerCategoryComponent),
        data: { pageTitle: 'تعديل تصنيف مورد', pageType: 'edit' }
    }
];
