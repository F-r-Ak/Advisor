/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { apiRolesGet$Json } from '../fn/roles/api-roles-get-json';
import { ApiRolesGet$Json$Params } from '../fn/roles/api-roles-get-json';
import { apiRolesGet$Plain } from '../fn/roles/api-roles-get-plain';
import { ApiRolesGet$Plain$Params } from '../fn/roles/api-roles-get-plain';
import { LookupDto } from '../models/lookup-dto';

@Injectable({ providedIn: 'root' })
export class RolesService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `apiRolesGet()` */
  static readonly ApiRolesGetPath = '/api/Roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Plain$Response(params?: ApiRolesGet$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LookupDto>>> {
    return apiRolesGet$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRolesGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Plain(params?: ApiRolesGet$Plain$Params, context?: HttpContext): Observable<Array<LookupDto>> {
    return this.apiRolesGet$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LookupDto>>): Array<LookupDto> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `apiRolesGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Json$Response(params?: ApiRolesGet$Json$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<LookupDto>>> {
    return apiRolesGet$Json(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `apiRolesGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  apiRolesGet$Json(params?: ApiRolesGet$Json$Params, context?: HttpContext): Observable<Array<LookupDto>> {
    return this.apiRolesGet$Json$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<LookupDto>>): Array<LookupDto> => r.body)
    );
  }

}
