import { Component, OnInit, Input } from '@angular/core';
declare var chrome: any;

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.css']
})
export class CryptoDetailComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  @Input() crypto: any = null;
  goToCurrency(id) {
    chrome.tabs.create({
      url: 'https://coinmarketcap.com/currencies/' + id
    });
  }

}
