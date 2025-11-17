import { Routes } from '@angular/router';

export const sellerCategoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/seller-category/seller-category.component').then((c) => c.SellerCategoryComponent),
    data: { pageTitle: 'تصنيفات الموردين', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-seller-category/add-edit-seller-category.component').then((c) => c.AddEditSellerCategoryComponent),
    data: { pageTitle: 'اضافة تصنيف مورد', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-seller-category/add-edit-seller-category.component').then((c) => c.AddEditSellerCategoryComponent),
    data: { pageTitle: 'تعديل تصنيف مورد', pageType: 'edit' }
  }
];
