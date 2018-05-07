import { Injectable } from '@angular/core';
declare var chrome: any;

@Injectable()
export class StorageService {
  constructor() { }
  private _langSelect;
  private defaultCurrency = {'lang': 'USD'};

  /** This function return a default currency options or the currency selected by the user */
  get langSelect() {
    return new Promise<any>((resolve, reject) => {

      /** This condition is used when we are in production */
      if (chrome.storage !== undefined) {
        chrome.storage.sync.get('lang', (langResult: any) => {
          console.log('type of langResult', typeof(langResult));
          const langSelected = langResult.lang !== undefined ?  langResult.lang : this.defaultCurrency;
          this._langSelect = langSelected;
          resolve(langSelected);
        });
      } else {
        /** Condition used on developpement prod */
        resolve(this.defaultCurrency);
      }
    });
  }

  /** This function set the currency selected by the user */
  set langSelect(value: Promise<any>) {
    if (chrome.storage !== undefined) {
      chrome.storage.sync.set({'lang' : value});
    }
    this._langSelect = value;
  }

}
