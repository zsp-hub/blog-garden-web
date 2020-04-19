import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataPersistenceServices {
  // LocalStorage设置数据
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  // 获取数据
  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  // 删除数据
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
