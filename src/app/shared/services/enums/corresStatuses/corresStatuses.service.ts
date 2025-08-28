import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class CorresStatusesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/corresstatuses/';
    }

    get CorresStatuses() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
