import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';

@Injectable()
export class UserService {
  url: string = '';
  identity: any;
  token: any;

  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  test() {
    return 'Hola mundo desde un servicio';
  }

  register(user: any): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'register', params, { headers: headers });
  }

  signup(user: any, gettoken: boolean = false): Observable<any> {
    if (gettoken != false) {
      user.gettoken = 'true';
    }

    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this._http.post(this.url + 'login', params, { headers: headers });
  }

  update(token: any, user: any): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json=' + json;

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);

    return this._http.put(this.url + 'user/edit', params, { headers: headers });
  }

  getIdentity() {
    let identityJSON = localStorage.getItem('identity') || '{}';
    let identity = JSON.parse(identityJSON);

    if (identity && identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token && token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }
}