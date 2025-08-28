export interface Lookup {
  id: string | null;
  nameEn: string;
  nameAr: string;
  code: string;
}

export interface SharedProperties {
  createdById: string;
  createdDate: string;
  modifiedDate: string;
  modifiedById: null;
}
