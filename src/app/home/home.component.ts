import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TablesComponent} from './tables/tables.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(TablesComponent) TableComponent: TablesComponent;

  cryptoId = null;
  title = 'Live Crypto Currency';
  subtitle = 'Get instant-realtime crypto value';

  selectDetail(event) {
    this.cryptoId = event;
  }

  changeCurrency(event) {
    this.TableComponent.currencyFormat = { lang: event };
    this.TableComponent.getCrypto2(100, event);
  }

  ngAfterViewInit() {
  }

}
