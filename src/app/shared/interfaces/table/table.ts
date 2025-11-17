import { GetPagedBody } from '../get-paged/get-paged';

export interface TableOptions {
  /* hold the urls fro get and delete */
  inputUrl: Url;
  /* hold Columns Definitions */
  inputCols?: ColumnsInterface[];
  /* hold actions */
  inputActions?: ActionsInterface[];

  bodyOptions?: GetPagedBody<any> | any;

  responsiveDisplayedProperties?: string[];

  rowKeys?: object[];

  permissions?: Permission;

  route?: string;

  appId?: number;

  includeAppId?: boolean;

  dataKey?: string;

  hasFilterInputs?: boolean;
}

export interface ColumnsInterface {
  field?: string;
  header?: string;
  placeholder?: string;
  filter?: boolean;
  filterMode?: string;
  filterColumnName?: string;
  sort?: boolean;
  sortCol?: string;
  dataType?: string;
  dateFormat?: string;
  route?: string;
  viewRoute?: string;
}

export interface ActionsInterface {
  name?: string;
  icon?: string;
  color?: string;
  permission?: string;
  isDelete?: boolean;
  isBlock?: boolean;
  isEdit?: boolean;
  isView?: boolean;
  route?: string;
  allowAll?: boolean;
  isCallBack?: boolean;
  call?: (row?: any) => any;
}

export interface Url {
  getAll?: string;
  getAllMethod?: API_Methods;
  delete: string;
}

export interface Permission {
  /* hold permissions */
  listOfPermissions: string[];
  /* Allow All Users To Access */
  allowAll?: boolean;
  /* hold the component name */
  componentName: string;
}

export type API_Methods = 'GET' | 'POST';
