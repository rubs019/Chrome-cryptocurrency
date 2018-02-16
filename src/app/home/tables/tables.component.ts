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


  public cryptoItem = []; // The list of all crypto data will be stocked in this variables
  private _currencyFormat: string; // The currencyFormat can be 'USD', 'EUR', 'GBP' etc...
  public price_currency: string; // The format of item as to be selected in JSON can be 'price_usd', 'price_eur', 'price_gbp' and more...
  loadingIndicator = true;
  messages = {
    emptyMessage: 'Sorry, but we can\'t retrieve all informations, please restart the applications.'
  }; // Message to be display if cryptoItem is not received
  @Output() onCryptoEmit = new EventEmitter<boolean>(); // Event triggered when user select a crypto item in datatable
  selectedCrypto = []; // Stock the data in this variable, when user select an item in datatable

  ngOnInit() {

    /**
     * This function get the lang parameters from localStorage and set the settings needed.
     */
    this.storage.langSelect.then((localStorage: any) => {
      this.currencyFormat = localStorage;

      this.getCrypto2(100, this._currencyFormat);
    });
  }

  /** This promise will return all data defined by params
  limit:int max return (def: 10)
  convert:string type of conversion (def: 'EUR')*/
  public getCrypto2(limit: number, convert: string) {
    this.price_currency = 'price_' + this.currencyFormat.toLowerCase();
    this.loadingIndicator = true;
    this.api.get(convert, limit)
      .subscribe((cryptos: any) => {
        const cryptoMap = cryptos.map(
          async (crypto: any) => {
            crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
            crypto.price_usd = crypto[this.price_currency];
            crypto.currency = this._currencyFormat;
          }
        );

        Promise.all(cryptoMap)
          .then(() => this.cryptoItem = cryptos)
          .catch(() => this.cryptoItem = []);

      }, (error) => {
        console.error(error);
        this.loadingIndicator = false;
      }, () => this.loadingIndicator = false);
  }

  // Emit the data to the parent
  onSelect(crypto: any) {
    this.onCryptoEmit.emit(crypto.selected[0]);
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
