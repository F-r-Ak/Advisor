import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'الرئيسية',
                items: [{ label: 'لوحة التحكم', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
            },
            {
                label: '',
                items: [
                    {
                        label: 'الاعدادات',
                        icon: 'pi pi-fw pi-spin pi-cog',
                        // routerLink: ['/pages'],
                        items: [
                            {
                                label: 'المسميات الوظيفية',
                                icon: 'pi pi-briefcase',
                                routerLink: ['/pages/settings/positions']
                            },
                            {
                                label: 'تسعير العناصر',
                                icon: 'pi pi-tag',
                                routerLink: ['/pages/settings/item-pricing']
                            },
                            {
                                label: 'الوحدات ',
                                icon: 'pi pi-box',
                                routerLink: ['/pages/settings/units']
                            },
                            {
                                label: 'الشركة المصنعة ',
                                icon: 'pi pi-building',
                                routerLink: ['/pages/settings/vendor']
                            },

                            {
                                label: 'مسميات الفروع',
                                icon: 'pi pi-sitemap',
                                routerLink: ['/pages/settings/branchs']
                            },
                            {
                                label: 'مسميات المناطق',
                                icon: 'pi pi-warehouse',
                                routerLink: ['/pages/settings/regions']
                            },
                            {
                                label: 'الخزن',
                                icon: 'pi pi-server',
                                routerLink: ['/pages/settings/treasury']
                            },
                            {
                                label: 'تصنيفات العملاء',
                                icon: 'pi pi-cart-minus',
                                routerLink: ['/pages/settings/client-category']
                            },
                            {
                                label: 'تصنيفات الموردين',
                                icon: 'pi pi-cart-arrow-down',
                                routerLink: ['/pages/settings/seller-category']
                            },
                            {
                                label: 'صلاحيات المستخدم',
                                icon: 'pi pi-shield',
                                routerLink: ['/pages/settings/user-role']
                            }
                        ]
                    }
                ]
            },
             {
                label: 'الشاشات',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'الاصناف',
                        icon: 'pi pi-fw pi-tags',
                        routerLink: ['/pages/items']
                    },
                    {
                        label: 'بيانات الجهات',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-info']
                    },
                    {
                        label: ' الحوادث',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/accident']
                    },
                    {
                        label: 'الشركات المالكة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-owner-companies']
                    },
                    {
                        label: 'شركات التشغيل',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/org-operator-companies']
                    },
                    {
                        label: 'بيانات الوحدة العائمة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/floating-units']
                    },
                    {
                        label: 'بيانات الرحلة العائمة',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/trip-information']
                    },
                    {
                        label: 'بيانات المراسي السياحية',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/pages/tourist-marina']
                    }
                ]
            },
        ];
    }
}
