import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
declare var chrome: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  constructor(private api: ApiService) { }


  cryptoItem: any = null;
  private _currencyFormat = 'USD';
  public prop = 'price_' + this._currencyFormat.toLowerCase();
  loadingIndicator = true;
  @Output() onClick = new EventEmitter<boolean>();
  tabs = 'color: white';
  selected = [];

  ngOnInit() {
    /*this.getCrypto(100, this.currencyFormat)
    .then((result) => {
      this.cryptoItem = result;
    });*/
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
    this.api.get(convert, limit)
      .subscribe((cryptos: any) => {
        cryptos.map((crypto: any) => {
          crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
          return crypto;
        });
        this.loadingIndicator = false;
        this.cryptoItem = cryptos;
        this.prop = 'price_usd';
        return true;
      });
  }

  // Emit the data to the parent
  onSelect(crypto) {
    console.log('OnSelect', crypto.selected[0]);
    this.onClick.emit(crypto.selected[0]);
  }

  get currencyFormat(): any {
    return this._currencyFormat;
  }

  set currencyFormat(value: string) {
    this._currencyFormat = value;
  }

  getCellClass() {
    return 'test';
  }

}
