import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(
  	private http:HttpClient
  	) { }

  get(limit = 10, convert = 'USD') {
  	return this.http.get('https://cryptocurrency-net.herokuapp.com?limit=' + limit + '&convert=' + convert)
  }

}
