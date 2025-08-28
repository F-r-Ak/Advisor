export interface UrlConfig {
  apiName: string;
  params?: { [header: string]: string | string[]; };
  showAlert?: boolean;
}
