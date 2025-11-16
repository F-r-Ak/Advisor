import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // ============================
  // LOCAL STORAGE
  // ============================

  /**
   * تخزين عنصر في localStorage بعد تحويله إلى JSON
   * @param key المفتاح
   * @param value القيمة المراد تخزينها
   */
  setLocal<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * استرجاع عنصر من localStorage وتحويله من JSON
   * @param key المفتاح
   * @returns القيمة بعد التحويل أو null
   */
  getLocal<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * حذف عنصر من localStorage
   */
  removeLocal(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * مسح جميع البيانات من localStorage
   */
  clearLocal(): void {
    localStorage.clear();
  }

  /**
   * تخزين عنصر في localStorage كـ Observable
   * @returns Observable<void>
   */
  setLocal$<T>(key: string, value: T): Observable<void> {
    this.setLocal(key, value);
    return of();
  }

  /**
   * استرجاع عنصر من localStorage كـ Observable
   */
  getLocal$<T>(key: string): Observable<T | null> {
    return of(this.getLocal<T>(key));
  }

  // ============================
  // SESSION STORAGE
  // ============================

  /**
   * تخزين عنصر في sessionStorage بعد تحويله إلى JSON
   */
  setSession<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * استرجاع عنصر من sessionStorage وتحويله من JSON
   */
  getSession<T>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * حذف عنصر من sessionStorage
   */
  removeSession(key: string): void {
    sessionStorage.removeItem(key);
  }

  /**
   * مسح جميع البيانات من sessionStorage
   */
  clearSession(): void {
    sessionStorage.clear();
  }

  /**
   * تخزين عنصر في sessionStorage كـ Observable
   */
  setSession$<T>(key: string, value: T): Observable<void> {
    this.setSession(key, value);
    return of();
  }

  /**
   * استرجاع عنصر من sessionStorage كـ Observable
   */
  getSession$<T>(key: string): Observable<T | null> {
    return of(this.getSession<T>(key));
  }
}
