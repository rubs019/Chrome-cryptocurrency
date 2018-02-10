import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {StorageService} from '../../services/storage.service';
declare var chrome: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  constructor(
    private api: ApiService,
    private storage: StorageService) { }


  cryptoItem = [];
  private _currencyFormat: string;
  public prop: string;
  loadingIndicator = true;
  @Output() onClick = new EventEmitter<boolean>();
  tabs = 'color: white';
  selected = [];

  ngOnInit() {
    this.currencyFormat = this.storage.langSelect;
    this.prop = 'price_' + this._currencyFormat.toLowerCase();
    console.log('this.currencyFormat | tables : ', this.currencyFormat);
    this.getCrypto2(100, this._currencyFormat);
  }

  // This promise will return all data defined by params
  // limit:int max return (def: 10)
  // convert:string type of conversion (def: 'EUR')
  public getCrypto(limit: number, convert: string) {
    return new Promise(resolve => {
      this.api.get(convert, limit)
      .subscribe((cryptos: any) => {
        const cryptosConverted = cryptos.map((crypto: any) => {
          crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
          return crypto;
        });
        this.loadingIndicator = false;
        resolve(cryptosConverted);
      });
    });
  }

  public getCrypto2(limit: number, convert: string) {
    console.log('getCrypto2 ------------------------');
    this.prop = 'price_' + this._currencyFormat.toLowerCase();
    console.log('this.currencyFormat', this.currencyFormat)
    this.loadingIndicator = true;
    this.api.get(convert, limit)
      .subscribe((cryptos: any) => {
        console.log('I receveid all crypto', new Date());
        const cryptoMap = cryptos.map(async (crypto: any) => {
          crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
          crypto.price_usd = crypto[this.prop];
          crypto.currency = this._currencyFormat;
          return crypto;
        });

        Promise.all(cryptoMap).then((completed) => {
          this.cryptoItem = cryptos;
          console.log('this._currencyFormat.toLowerCase()', this._currencyFormat.toLowerCase());
          console.log(this.cryptoItem);
          console.log('ended');
          this.loadingIndicator = false;
          return true;
        });
      });
  }

  // Emit the data to the parent
  onSelect(crypto: any) {
    this.onClick.emit(crypto.selected[0]);
  }

  get currencyFormat(): any {
    return this._currencyFormat;
  }

  set currencyFormat(value: any) {
    this._currencyFormat = value;
  }

  getCellClass() {
    return ' changeCss';
  }

}
