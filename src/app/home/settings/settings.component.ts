import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private storage: StorageService) { }

  @Output() onSelectLang = new EventEmitter();
  langDefault: string = null;

  languageList: any = [
    'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR',
    'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR',
    'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR', 'USD'].sort();

  ngOnInit() {
    this.storage.langSelect.then((result: any) => this.langDefault = result);
  }

  onSelect(lang: any) {
    // Save the lang storage if production mode
    this.storage.langSelect = lang;
    this.onSelectLang.emit(lang.toLowerCase());
  }

}

