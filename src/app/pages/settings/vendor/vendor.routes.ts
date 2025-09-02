import { Routes } from '@angular/router';

export const vendorRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/vendor/vendor.component').then((c) => c.VendorComponent),
        data: { pageTitle: 'الشركات المصنعة', pageType: 'list' }
    },
    {
        path: 'add',
        loadComponent: () => import('./components/add-edit-vendor/add-edit-vendor.component').then((c) => c.AddEditVendorComponent),
        data: { pageTitle: 'اضافة الشركة مصنعة', pageType: 'add' }
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/add-edit-vendor/add-edit-vendor.component').then((c) => c.AddEditVendorComponent),
        data: { pageTitle: 'تعديل الشركة مصنعة', pageType: 'edit' }
    }
];
