import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  url = environment.production ? 'https://cryptocurrency-net.herokuapp.com' : 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(convert: String = 'USD', limit: Number = 100) {
    return this.http.get(this.url + '?limit=' + limit + '&convert=' + convert);
  }

}
