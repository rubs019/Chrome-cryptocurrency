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
  messages = {
    emptyMessage: 'Sorry, but we can\'t retrieve all informations, please restart the applications.'
  };
  @Output() onClick = new EventEmitter<boolean>();
  tabs = 'color: white';
  selected = [];

  ngOnInit() {
    this.storage.langSelect.then((result: any) => {
      this.currencyFormat = result.lang;
      this.prop = 'price_' + this._currencyFormat.toLowerCase();
      console.log('this.getCrypto2(100, this._currencyFormat)', this.getCrypto2(100, this._currencyFormat));
      this.getCrypto2(100, this._currencyFormat);
    });
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
    this.prop = 'price_' + this._currencyFormat.toLowerCase();
    this.loadingIndicator = true;
    this.api.get(convert, limit)
      .subscribe((cryptos: any) => {
        const cryptoMap = cryptos.map(async (crypto: any) => {
          crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
          crypto.price_usd = crypto[this.prop];
          crypto.currency = this._currencyFormat;
          return crypto;
        });

        Promise.all(cryptoMap).then((completed) => {
          this.cryptoItem = cryptos;
          this.loadingIndicator = false;
          return true;
        });
      }, error2 => {
        console.log(error2);
        this.loadingIndicator = false;
        this.cryptoItem = [];
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
    return 'changeCss';
  }

}
