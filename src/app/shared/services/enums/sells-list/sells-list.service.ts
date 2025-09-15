import { Injectable } from '@angular/core';
import { HttpService } from '../../../../core';
import { EnumDto } from '../../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SellsListService extends HttpService {
  protected get baseUrl(): string {
    return 'v1/sellslist/';
  }

  get sellsList() {
    return this.get<EnumDto[]>({ apiName: 'getAll' });
  }
}

