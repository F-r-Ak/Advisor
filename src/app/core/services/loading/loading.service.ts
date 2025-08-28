import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingMap: Map<string, boolean> = new Map<string, boolean>();
  isLoading$ = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error('The request URL must be provided to the LoadingService.setLoading function');
    }

    if (loading) {
      this.loadingMap.set(url, loading);
      this.isLoading$.next(loading);
    } else if (!loading && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0) {
      this.isLoading$.next(false);
    }
  }
}
