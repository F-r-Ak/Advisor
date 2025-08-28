import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private appConfig: any;
    private configFile: any;

    httpClient = inject(HttpClient);
    constructor() {
        this.getConfigFileName();
    }

    loadAppConfig() {
        return this.httpClient
            .get('assets/config/' + this.configFile)
            .toPromise()
            .then((data) => {
                this.appConfig = data;
                console.log('dataaaaaaaaaaaa:', data);
            })
            .catch((error) => {
                console.error('Failed to load config:', error);
                // Fallback to environment if config fails
                this.appConfig = environment;
                console.log('dataaaaaaaaaaaa:', environment);
            });
    }
    getConfigFileName(): void {
        console.log('environment.state:', environment.state);

        if (environment.state === 'development') {
            this.configFile = 'development.json';
        }
        if (environment.state === 'production') {
            this.configFile = 'production.json';
        }
    }

    getServerUrl(): string {
        return this.appConfig.HOST_API;
    }
    getAppUrl(key: string): any {
        return this.appConfig[key];
    }
}
