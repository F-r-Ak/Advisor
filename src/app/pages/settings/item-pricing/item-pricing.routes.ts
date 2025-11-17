import { Routes } from '@angular/router';

export const itemPricingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/item-pricing/item-pricing.component').then((c) => c.ItemPricingComponent),
    data: { pageTitle: 'تسعير البيع', pageType: 'list' }
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add-edit-item-pricing/add-edit-item-pricing.component').then((c) => c.AddEditItemPricingComponent),
    data: { pageTitle: 'اضافة تسعير البيع', pageType: 'add' }
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./components/add-edit-item-pricing/add-edit-item-pricing.component').then((c) => c.AddEditItemPricingComponent),
    data: { pageTitle: 'تعديل تسعير البيع', pageType: 'edit' }
  }
];
