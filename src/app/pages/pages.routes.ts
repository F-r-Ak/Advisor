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
                loadChildren: () => import('./settings/item-pricing/item-pricing.routes').then((m) => m.itemPricingRoutes)
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
                loadChildren: () => import('./settings/branchs/branchs.routes').then((m) => m.branchsRoutes)
            },
            {
                path: 'regions',
                loadChildren: () => import('./settings/regions/regions.routes').then((m) => m.regionsRoutes)
            },
            {
                path: 'client-category',
                loadChildren: () => import('./settings/client-category/client-category.routes').then((m) => m.clientCategoryRoutes)
            },
            {
                path: 'seller-category',
                loadChildren: () => import('./settings/seller-category/seller-category.routes').then((m) => m.sellerCategoryRoutes)
            },
            {
                path: 'treasury',
                loadChildren: () => import('./settings/treasury/treasury.routes').then((m) => m.treasuryRoutes)
            },
            {
                path: 'user-role',
                loadChildren: () => import('./settings/user-role/user-role.routes').then((m) => m.userRoleRoutes)
            },
            {
                path: 'user',
                loadChildren: () => import('./settings/user/user.routes').then((m) => m.userRoutes)
            },
            {
                path: 'employee',
                loadChildren: () => import('./settings/employee/employee.routes').then((m) => m.employeeRoutes)
            },
            {
                path: 'user-groups',
                loadChildren: () => import('./settings/user-groups/user-groups.routes').then((m) => m.userGroupsRoutes)
            },
            {
                path: 'item-categories',
                loadChildren: () => import('./settings/item-categories/item-category.routes').then((m) => m.itemCategoryRoutes)
            },
            {
                path: 'countries',
                loadChildren: () => import('./settings/countries/countries.routes').then((m) => m.countriesRoutes)
            },
            {
                path: 'cities',
                loadChildren: () => import('./settings/cities/cities.routes').then((m) => m.citiesRoutes)
            },
            {
                path: 'job-titles',
                loadChildren: () => import('./settings/job-titles/job-titles-routes').then((m) => m.jobTitlesRoutes)
            }
        ]
    },
    {
        path: 'items',
        loadChildren: () => import('./items/items.routes').then((m) => m.ItemsRoutes)
    },
    {
        path: 'clients',
        loadChildren: () => import('./clients/clients.routes').then((m) => m.ClientsRoutes)
    },
    {
        path: 'shifts',
        loadChildren: () => import('./shift/shift.routes').then((m) => m.ShiftsRoutes)
    },
    {
        path: 'user-user-group',
        loadChildren: () => import('./user-user-group/user-user-group.routes').then((m) => m.UserUserGroupRoutes)
    },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
