import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cryptoId = null;

  selectDetail(event) {
  	console.log(event);
  	this.cryptoId = event;
  }
}
