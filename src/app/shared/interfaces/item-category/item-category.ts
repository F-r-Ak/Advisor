import { Lookup, SharedProperties } from '../shared/shared';

export interface ItemCategoryDto extends Lookup, Partial<SharedProperties> {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  sellsList: string;
  theOrder: number;
  categoryType: string;
  parentCategoryId: string;
  childCategories: ItemCategoryDto[];
}

export interface AddItemCategoryDto extends Lookup, Partial<SharedProperties> {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  sellsList: number;
  theOrder: number;
  categoryType: number;
  parentCategoryId: string;
}

export interface UpdateItemCategoryDto extends Lookup, Partial<SharedProperties> {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  sellsList: number;
  theOrder: number;
  categoryType: number;
  parentCategoryId: string;
}
