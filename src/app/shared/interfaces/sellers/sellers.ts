import { EnumDto } from '../enum/enum';
import { Lookup, SharedProperties } from '../shared/shared';

export interface SellerDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    sellerCategoryId: string;
    sellerCategory: string;
    regionId: string;
    region: string;
    dealerType: EnumDto;
    openingBalance: number;
    paymentTerms: EnumDto;
    maxDebt: number;
    isActive: boolean;
    createdDate: string;
    clientId: string;
    clientNameAr: string;
    clientNameEn: string;
}

export interface AddSellerDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    sellerCategoryId: string;
    regionId: string;
    dealerType: string;
    openingBalance: number;
    paymentTerms: string;
    maxDebt: number;
    isActive: boolean;
    clientId: string;
}

export interface UpdateSellerDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    sellerCategoryId: string;
    regionId: string;
    dealerType: string;
    openingBalance: number;
    paymentTerms: string;
    maxDebt: number;
    isActive: boolean;
    clientId: string;
}
