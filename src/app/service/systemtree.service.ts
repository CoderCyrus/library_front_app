import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpData } from '../model/httpData.model';
import 'core-js/es/reflect';
@Injectable()
export class SystemtreeService {

  constructor(private http: HttpClient) { }

  
  systree_url = 'http://localhost:8080/system/tree/structure';

  getSystemtree() {
    return this.http.get<HttpData>(this.systree_url);
    
  }


}