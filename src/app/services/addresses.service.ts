import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private http: HttpClient) { }

  getAddresses(){
    return this.http.get('https://agendjango.herokuapp.com/api/enderecos/');
  }

  createAddress(address){
    return this.http.post('https://agendjango.herokuapp.com/api/enderecos/', address);
  }

  updateAddress(id, address){
    return this.http.post('https://agendjango.herokuapp.com/api/enderecos/' + id + '/', address);
  }

  deleteAddress(id){
    return this.http.delete('https://agendjango.herokuapp.com/api/enderecos/' + id + '/');
  }
}
