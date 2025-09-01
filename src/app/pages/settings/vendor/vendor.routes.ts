import { Routes } from '@angular/router';

export const vendorRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/vendor/vendor.component').then((c) => c.VendorComponent),
        data: { pageTitle: 'الشركة المصنعة', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-vendor/add-edit-vendor.component').then((c) => c.AddEditVendorComponent),
        data: { pageTitle: 'اضافة شركة مصنعة جديدة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-vendor/add-edit-vendor.component').then((c) => c.AddEditVendorComponent),
        data: { pageTitle: 'تعديل شركة مصنعة', pageType: 'edit' }
    }
];
