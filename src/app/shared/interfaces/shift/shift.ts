import { SharedProperties } from '../shared/shared';

export interface ShiftDto extends Partial<SharedProperties> {
  id: string;
  startTime: string; // ISO 8601 string;
  endTime: string; // ISO 8601 string;
  userId: string;
  user: string;
  branchId: string;
  branch: string;
  startValue: number;
  endValue: number;
  notes: string;
}

export interface AddShiftDto extends Partial<SharedProperties> {
  id: string;
  startTime: string; // ISO 8601 string;
  endTime: string; // ISO 8601 string;
  userId: string;
  branchId: string;
  startValue: number;
  endValue: number;
  notes: string;
}

export interface UpdateShiftDto extends Partial<SharedProperties> {
  id: string;
  startTime: string; // ISO 8601 string;
  endTime: string; // ISO 8601 string;
  userId: string;
  branchId: string;
  startValue: number;
  endValue: number;
  notes: string;
}
