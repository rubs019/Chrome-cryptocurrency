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
          let langSelected = langResult.length !== undefined ?  langResult : {'lang': 'USD'};
          this._langSelect = langSelected;
          resolve(langSelected);
        });
      } else {
        resolve({'lang': 'USD'});
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
