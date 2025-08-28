import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class OrganizationTypesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/organizationtypes/';
    }

    get OrganizationTypes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
