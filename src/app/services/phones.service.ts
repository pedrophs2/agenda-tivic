import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhonesService {

  phone: any;

  constructor(private http: HttpClient) { }

  getPhones(){
    return this.http.get('https://agendjango.herokuapp.com/api/telefones/');
  }

  createPhone(phone){
    return this.http.post('https://agendjango.herokuapp.com/api/telefones/', phone);
  }

  updatePhone(id, phone){
    return this.http.put('https://agendjango.herokuapp.com/api/telefones/' + id + '/', phone);
  }

  deletePhone(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/telefones/' + id + '/');
  }
}
