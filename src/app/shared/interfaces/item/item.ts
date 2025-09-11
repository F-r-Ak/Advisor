import { Lookup, SharedProperties } from '../shared/shared';

export interface ItemDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    itemVendorId: string;
    itemCategoryId: string;
    checkRest: boolean;
    stopSell: boolean;
    expireDays: number;
    orderLimit: number;
    idleLimit: number;
    maxSellDiscount: number;
    sellsList: string;
    isActive: boolean;
}

export interface AddItemDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    itemVendorId: string;
    itemCategoryId: string;
    checkRest: boolean;
    stopSell: boolean;
    expireDays: number;
    orderLimit: number;
    idleLimit: number;
    maxSellDiscount: number;
    sellsList: string;
    isActive: boolean;
}

export interface UpdateItemDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    itemVendorId: string;
    itemCategoryId: string;
    checkRest: boolean;
    stopSell: boolean;
    expireDays: number;
    orderLimit: number;
    idleLimit: number;
    maxSellDiscount: number;
    sellsList: string;
    isActive: boolean;
}
