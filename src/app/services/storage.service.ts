import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
declare var chrome: any;

@Injectable()
export class StorageService {
  constructor() { }
  private _langSelect;
  get langSelect() {
    /*if (environment.production) {
      chrome.storage.get('lang', (langResult: any) => {
        console.log('langResult', langResult);
        this._langSelect = langResult.lang;
      });
    }*/
    return new Promise<string>((resolve, reject) => {
      chrome.storage.sync.get('lang', (langResult: any) => {
        console.log('langResult', langResult);
        this._langSelect = langResult;
        resolve(langResult);
      });
    });
  }

  set langSelect(value: Promise<string>) {
    console.log('environment.production', environment.production);
    /*if (environment.production) {
      chrome.storage.sync.set({'lang' : value}, () => {
        console.log('success');
      });
    }*/
    chrome.storage.sync.set({'lang' : value}, () => {
      console.log('success');
    });
    this._langSelect = value;
  }

}
