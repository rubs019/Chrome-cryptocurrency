import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() { }
  private _langSelect;
  get langSelect() {
    return this._langSelect || 'EUR';
  }

  set langSelect(value) {
    this._langSelect = value;
  }

}
