import { Routes } from '@angular/router';

export const itemsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/items/items.component').then((c) => c.ItemsComponent),
    data: { pageTitle: 'الاصناف', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-item/add-edit-item.component').then((c) => c.AddEditItemComponent),
    data: { pageTitle: 'إضافة صنف', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-item/add-edit-item.component').then((c) => c.AddEditItemComponent),
    data: { pageTitle: 'تعديل صنف', pageType: 'edit' }
  }
];
