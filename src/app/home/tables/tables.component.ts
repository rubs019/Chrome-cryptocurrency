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

  	ngOnInit() {
  		this.getCrypto(10, 'EUR');
  	}

  	getCrypto(limit, convert) {
  		this.api.get(limit, convert).subscribe((result) => {
  			console.log(result);
  			this.cryptoItem = result;
  		});
  	}

  	cryptoDetail(id) {
      this.onClick.emit(id);
  	}


}
