import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(convert: String = 'USD', limit: Number = 100) {
    return this.http.get(this.apiUrl + '?limit=' + limit + '&convert=' + convert);
  }

}
