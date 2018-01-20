import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  	constructor(
  		private api:ApiService
	) { }

    cryptoItem: any;

  	ngOnInit() {
  		this.getCrypto(10, 'EUR');
  	}

  	getCrypto(limit, convert) {
  		this.api.get(limit, convert).subscribe((result) => {
  			this.cryptoItem = result;
  		});
  	}

}
