import { Lookup, SharedProperties } from '../shared/shared';

export interface CityDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    countryId: string;
    countryNameAr: string;
    countryNameEn: string;
}

export interface AddCityDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    countryId: string;
}

export interface UpdateCityDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    countryId: string;
}
