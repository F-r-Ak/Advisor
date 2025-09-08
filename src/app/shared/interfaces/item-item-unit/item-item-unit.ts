import { Lookup, SharedProperties } from '../shared/shared';

export interface ItemItemUnitDto extends Lookup, Partial<SharedProperties> {
  id: string;
  categoryTypeId: string;
  class: string;
  nameAr: string;
  nameEn: string;
  messageAr: string;
  messageEn: string;
  fromDate: string;
  thruDate: string;
  statusType: string;
  canCheck: boolean;
  leaveTypeId: string;
}

export interface AddItemItemUnitDto extends Lookup, Partial<SharedProperties> {
  id: string;
  categoryTypeId: string;
  class: string;
  nameAr: string;
  nameEn: string;
  messageAr: string;
  messageEn: string;
  fromDate: string;
  thruDate: string;
  statusType: string;
  canCheck: boolean;
  leaveTypeId: string;
}

export interface UpdateItemItemUnitDto extends Lookup, Partial<SharedProperties> {
  id: string;
  categoryTypeId: string;
  class: string;
  nameAr: string;
  nameEn: string;
  messageAr: string;
  messageEn: string;
  fromDate: string;
  thruDate: string;
  statusType: string;
  canCheck: boolean;
  leaveTypeId: string;
}
