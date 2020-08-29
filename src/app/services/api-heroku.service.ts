import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiHerokuService {

  pessoa: any;

  constructor(private http: HttpClient) { }


  getPhones(){
    return this.http.get('https://agendjango.herokuapp.com/api/telefones/');
  }
  getAddresses(){
    return this.http.get('https://agendjango.herokuapp.com/api/enderecos/');
  }

  createPeople(person){
    return this.http.post('https://agendjango.herokuapp.com/api/pessoas/', person);
  }
  createPhone(phone){
    return this.http.post('https://agendjango.herokuapp.com/api/telefones/', phone);
  }
  createAddress(address){
    return this.http.post('https://agendjango.herokuapp.com/api/enderecos/', address);
  }

  deletePerson(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/pessoas/' + id);
  }
  deletePhone(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/telefones/' + id);
  }
  deleteAddress(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/enderecos/' + id);
  }
}
