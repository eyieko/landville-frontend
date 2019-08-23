import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  // pass a value you want to get from the localStorage as the string `value`.
  // if the value is not found, pass a fallback. It can be anything.
  get(key: string, fallback: any) {
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem(key);
      return value ? value : fallback;
    }
  }
  set(key: string, value: any) {

    if (isPlatformBrowser(this.platformId)) {
      console.log('hello')
      localStorage.setItem(key, value);
    }
  }
  clear() {

    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
