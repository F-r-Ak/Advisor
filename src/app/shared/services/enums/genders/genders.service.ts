import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class GendersService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/genders/';
    }


    get Genders() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
