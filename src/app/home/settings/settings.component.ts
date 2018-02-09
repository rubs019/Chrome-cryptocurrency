import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  @Output() onSelectLang = new EventEmitter();

  languageList: any = [
    'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HUF', 'IDR',
    'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR',
    'PLN', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'ZAR'];

  ngOnInit() {
  }

  onSelect(lang: string) {
    this.onSelectLang.emit(lang.toLowerCase());
  }

}

