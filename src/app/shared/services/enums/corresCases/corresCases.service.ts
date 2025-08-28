import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class CorresCasesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/correscases/';
    }

    get CorresCases() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
