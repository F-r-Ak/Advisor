import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermsService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/paymentterms/';
  }

  get paymentTerms() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}

