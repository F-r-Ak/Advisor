import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DealerTypesService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/dealertype/';
  }

  get dealertypes() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}

