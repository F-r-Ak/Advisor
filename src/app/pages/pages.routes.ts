import { Routes } from '@angular/router';
import { Empty } from './empty/empty';

export default [
    {
        path: 'settings',
        children: [
            {
                path: 'positions',
                loadChildren: () => import('./settings/positions/positions.routes').then((m) => m.positionsRoutes)
            },
            {
                path: 'item-pricing',
                loadChildren: () => import('./settings/item-pricing/item-pricing.routes').then((m) => m.ItemPricingRoutes)
            },
            {
                path: 'units',
                loadChildren: () => import('./settings/units/units.routes').then((m) => m.unitsRoutes)
            },
            {
                path: 'vendor',
                loadChildren: () => import('./settings/vendor/vendor.routes').then((m) => m.vendorRoutes)
            },
            {
                path: 'branchs',
                loadChildren: () => import('./settings/branchs/branchs.routes').then((m) => m.BranchsRoutes)
            },
            {
                path: 'regions',
                loadChildren: () => import('./settings/regions/regions.routes').then((m) => m.RegionsRoutes)
            },
            {
                path: 'client-category',
                loadChildren: () => import('./settings/client-category/client-category.routes').then((m) => m.ClientCategoryRoutes)
            },
            {
                path: 'saller-category',
                loadChildren: () => import('./settings/saller-category/saller-category.routes').then((m) => m.SallerCategoryRoutes)
            }
        ]
    },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
