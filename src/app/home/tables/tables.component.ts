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
      this.getCrypto(100, 'EUR')
      .then((result) => {
        this.cryptoItem = result;
      });
  	}

  	// This promise will return all data defined by params
    // limit:int max return (def: 10)
    // convert:string type of conversion (def: 'EUR')
    getCrypto(limit: number, convert: string) {
  		return new Promise(resolve => {
        this.api.get(limit, convert)
        .subscribe((cryptos: any) => {
    			let cryptosConverted = cryptos.map((crypto: any) => {
            crypto.percent_change_24h = parseFloat(crypto.percent_change_24h);
            return crypto;
          })
          resolve(cryptosConverted);
    		});
      });
  	}

  // Emit the data to the parent  
	onSelect(crypto) {
    this.onClick.emit(crypto.selected[0]);
	}

}
