import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class AttachTypesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/attachtypes/';
    }

    get AttachTypes() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
