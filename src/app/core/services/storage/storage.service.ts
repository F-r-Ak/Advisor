import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setItemInLocalStorageAsObservable = (key: string, value: string) => {
    return of(localStorage.setItem(key, value));
  };
  setItemInSessionStorageAsObservable = (key: string, value: string) => {
    return of(sessionStorage.setItem(key, value));
  };

  setItemInLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };
  setItemInSessionStorage = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };

  getItemObservableFromLocalStorage = (key: string) => {
    return of(localStorage.getItem(key));
  };
  getItemObservableFromSessionStorage = (key: string) => {
    return of(localStorage.getItem(key));
  };

  getItemFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  getItemFromSessionStorage(key: string) {
    return sessionStorage.getItem(key);
  }
  clearLocalStorageAsObservable() {
    return of(localStorage.clear());
  }
  clearSessionStorageAsObservable() {
    return of(sessionStorage.clear());
  }

  clearLocalStorage() {
    localStorage.clear();
  }
  clearSessionStorage() {
    sessionStorage.clear();
  }
}
