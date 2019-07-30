import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  // pass a value you want to get from the localStorage as the string `value`.
  // if the value is not found, pass a fallback. It can be anything.
  get(key: string, fallback: any) {
    const value = localStorage.getItem(key);

    return value ? value : fallback;
  }
  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  clear() {
    localStorage.clear();
  }
}
