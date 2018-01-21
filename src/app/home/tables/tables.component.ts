import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router }    from '@angular/router';
declare var chrome: any;

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  	constructor(
  		private api:ApiService
	) { }

    cryptoItem: any = null;
    @Output() onClick = new EventEmitter<boolean>();
    selected = [];

  	ngOnInit() {
      this.getCrypto(100, 'EUR').then((result) => {
        this.cryptoItem = result
        console.log(this.cryptoItem);
      });
  	}

  	getCrypto(limit, convert) {
  		return new Promise(resolve => {
        this.api.get(limit, convert).subscribe((cryptos: any) => {
    			let cryptosClean = cryptos.map((crypto: any) => {
            crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
            return crypto;
          })
          resolve(cryptosClean);
    		});
      });
  	}

	cryptoDetail(crypto) {
    this.onClick.emit(crypto.selected[0]);
	}

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  getCellClass({ row, column, value }): any {
    console.log(value);
    return {
      'is-negative': value === 'female'
    };
  }

}
