import { Injectable } from '@angular/core';
import { EnumDto } from '../../../interfaces';
import { HttpService } from '../../../../core/services/http/http.service';

@Injectable({
    providedIn: 'root'
})
export class CorresCategoriesService extends HttpService {
    protected get baseUrl(): string {
        return 'v1/correscategories/';
    }

    get CorresCategories() {
        return this.get<EnumDto[]>({ apiName: 'getAll' });
    }
}
