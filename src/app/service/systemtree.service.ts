import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Systemtree } from '../model/systemtree.model';
import 'core-js/es/reflect';
@Injectable()
export class SystemtreeService {

  constructor(private http: HttpClient) { }

  
  systree_url = 'http://localhost:8080/system/tree/structure';

  getSystemtree() {

    return this.http.get<[Systemtree]>(this.systree_url);
  }
}