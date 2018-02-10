import { Injectable } from '@angular/core';
declare var chrome: any;

@Injectable()
export class StorageService {
  constructor() { }
  private _langSelect;
  get langSelect() {
    return new Promise<any>((resolve, reject) => {
      if (chrome.storage !== undefined) {
        chrome.storage.sync.get('lang', (langResult: any) => {
          console.log('langResult', langResult);
          this._langSelect = langResult;
          resolve(langResult);
        });
      } else {
        resolve({'lang': 'EUR'});
      }
    });
  }

  set langSelect(value: Promise<any>) {
    if (chrome.storage !== undefined) {
      chrome.storage.sync.set({'lang' : value}, () => {
        console.log('success');
      });
    }
    this._langSelect = value;
  }

}
