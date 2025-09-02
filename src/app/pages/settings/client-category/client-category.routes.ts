import { Routes } from '@angular/router';

export const clientCategoryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/client-category/client-category.component').then((c) => c.ItemPricingComponent),
        data: { pageTitle: 'تصنيفات العملاء', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-client-category/add-edit-client-category.component').then((c) => c.AddEditClientCategoryComponent),
        data: { pageTitle: 'اضافة تصنيف عميل', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-client-category/add-edit-client-category.component').then((c) => c.AddEditClientCategoryComponent),
        data: { pageTitle: 'تعديل تصنيف عميل', pageType: 'edit' }
    }
];
