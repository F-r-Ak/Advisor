import { Lookup, SharedProperties } from '../shared/shared';

export interface RegionDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    cityId: string;
    cityName: string;
    branchRegions: RegionDto[];
}

export interface AddRegionDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    cityId: string;
}

export interface UpdateRegionDto extends Lookup, Partial<SharedProperties> {
    id: string;
    code: string;
    nameEn: string;
    nameAr: string;
    cityId: string;
}
