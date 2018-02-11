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

  selectDetail(event) {
    this.cryptoId = event;
  }

  changeCurrency(event) {
    console.log('changeCurrency', event);
    this.TableComponent.currencyFormat = event;
    this.TableComponent.getCrypto2(100, event);
  }

  ngAfterViewInit() {
  }

}
