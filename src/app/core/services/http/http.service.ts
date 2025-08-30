import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TranslationService } from '../../../shared';
import { NamedHttpStatus } from '../../enums/named-http-status';
import { ConfigService } from '../config/config.service';
import { AlertService } from '../alert/alert.service';
import { ApResponse } from '../../interface/response/response';
import { HttpServiceBaseService } from './HttpServiceBase.service';
import { UrlConfig } from '../../interface/http/UrlConfig';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpService extends HttpServiceBaseService {
  protected domainName: string;
  alertService = inject(AlertService);
  configService = inject(ConfigService);
  localize = inject(TranslationService);
  constructor(protected http: HttpClient) {
    super();
    this.domainName = this.configService.getAppUrl('HOST_API');
  }

  get<T>(URL_Config: UrlConfig): Observable<T> {
    return this.http.get<ApResponse<T>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params }).pipe(
      map(event => {
        return event.data;
      })
    );
  }

  getAll<T>(URL_Config: UrlConfig): Observable<T[]> {
    return this.http.get<ApResponse<T[]>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { params: URL_Config.params }).pipe(
      map(event => {
        return event.data;
      })
    );
  }

  postFilter<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map(event => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  post<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map(event => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  postRange<T, D>(URL_Config: UrlConfig, body: T): Observable<D> {
    return this.http
      .post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map(event => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event.data;
        })
      );
  }

  put<T, D>(URL_Config: UrlConfig, body: T): Observable<T> {
    return this.http.put<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(
      map((event: any) => {
        this.alertHandling(event);
        return event.data;
      })
    );
  }

  delete(URL_Config: UrlConfig, id: any): Observable<boolean> {
    return this.http
      .delete<ApResponse<boolean>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, { body: id, params: URL_Config.params })
      .pipe(
        map((event: any) => {
          this.alertHandling(event);
          return event.data;
        })
      );
  }

  dropdownPost<T, D>(URL_Config: UrlConfig, body: T): Observable<any> {
    return this.http
      .post<ApResponse<D>>(`${this.domainName}${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params })
      .pipe(
        map(event => {
          URL_Config.showAlert ? this.alertHandling(event) : '';
          return event;
        })
      );
  }

  dropdownExternalPost<T, D>(URL_Config: UrlConfig, body: T): Observable<any> {
    return this.http.post<ApResponse<D>>(`${this.baseUrl}${URL_Config.apiName}`, body, { params: URL_Config.params }).pipe(
      map(event => {
        URL_Config.showAlert ? this.alertHandling(event) : '';
        return event;
      })
    );
  }

  private alertHandling(event: ApResponse<any>) {
    if (event.status) {
      if (!Number.isNaN(Number(event.status))) {
        if (event.status.toString().startsWith('2')) {
          this.alertService.success(
            event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : 'Successfully Done...'
          );
        } else {
          this.alertService.error(event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : '!NOT HANDLED ERROR!');
        }
      } else {
        const status = event.status.toString();
        switch (status) {
          case NamedHttpStatus.Created: {
            this.alertService.success(
              event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : 'Successfully Done...'
            );
            break;
          }
          case NamedHttpStatus.Accepted: {
            this.alertService.success(
              event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : 'Successfully Done...'
            );
            break;
          }
          case NamedHttpStatus.NoContent: {
            this.alertService.success(
              event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : 'Successfully Done...'
            );
            break;
          }
          case NamedHttpStatus.BadRequest: {
            if (event.message === 'VALIDATION_ERROR' && event.data && Array.isArray(event.data)) {
              const errorMessages = event.data.map(error =>
                this.localize.translate.instant('VALIDATION.' + error)
              ).join(', ');

              this.alertService.error(errorMessages);
            } else {
              this.alertService.error(
                event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : '!NOT HANDLED ERROR!'
              );
            }
            break;
          }
          case NamedHttpStatus.InternalServerError: {
            this.alertService.error(
              event.message
                ? this.localize.translate.instant('VALIDATION.' + event.message)
                : this.localize.translate.instant('VALIDATION.INTERNAL_SERVER_ERROR')
            );
            break;
          }
          case NamedHttpStatus.Ok: {
            break;
          }
          default: {
            this.alertService.error(event.message ? this.localize.translate.instant('VALIDATION.' + event.message) : '!NOT HANDLED ERROR!');
          }
        }
      }
    }
  }
}
