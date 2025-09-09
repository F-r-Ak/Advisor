import { Lookup, SharedProperties } from '../shared/shared';

export interface ItemDto extends Lookup, Partial<SharedProperties> {
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

export interface AddItemDto extends Lookup, Partial<SharedProperties> {
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

export interface UpdateItemDto extends Lookup, Partial<SharedProperties> {
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
