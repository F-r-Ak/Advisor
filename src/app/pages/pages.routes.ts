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
        ]
    },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
