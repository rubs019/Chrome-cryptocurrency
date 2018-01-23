import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css']
})
export class CryptoDetailComponent implements OnInit {
	constructor() { }

	ngOnInit() {}

	@Input() crypto: any = null;

}
