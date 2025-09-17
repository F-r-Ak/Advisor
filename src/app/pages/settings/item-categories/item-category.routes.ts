import { Routes } from '@angular/router';

export const itemCategoryRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/item-categories/item-categories.component').then((c) => c.ItemCategoriesComponent),
        data: { pageTitle: 'تصنيفات العناصر', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-item-categories/add-edit-item-categories.component').then((c) => c.AddEditItemCategoriesComponent),
        data: { pageTitle: 'اضافة تصنيف', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-item-categories/add-edit-item-categories.component').then((c) => c.AddEditItemCategoriesComponent),
        data: { pageTitle: 'تعديل تصنيف', pageType: 'edit' }
    }
];
