import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHerokuService {

  pessoa: any;

  constructor(private http: HttpClient) { }

  getPessoas(){
    return this.http.get('https://agendjango.herokuapp.com/api/pessoas/');
  }
}
